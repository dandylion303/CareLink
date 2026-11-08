import minimiRetributivi from "../../config/ccnl2026.js";

const getTable = (workRequest) => {
    if (workRequest === 'convivente') {
        return 'A'
    }
    if (workRequest === 'nonConvivente') {
        return 'C'
    }
    if (workRequest === 'conviventePartTime') {
        return 'B'
    }
    if (workRequest === 'notturno') {
        return 'D'
    }
    throw new Error('Regime non riconosciuto')
}

const getColfLevel = (colfDetails) => {
    if (colfDetails?.experienceLevel === 'base') {
        return 'A'
    }
    if (colfDetails?.otherStaff==='si') {
        return 'D'
    }
    if (colfDetails?.specificSkillsNeeded ==='si' && colfDetails?.specificCompetenceNeeded?.length>0) {
        return 'C'
    }
    return 'B'
}

// CS di base, DS se servono terapie o macchinari specifici
const getCareLevel = (badanteDetails) => {
    if (badanteDetails?.hasSpecialNeeds==='si') return 'DS'
    return 'CS'
}


const getBadanteLevel = (badanteDetails) => {
    const selfSufficient = badanteDetails?.selfSufficientLevel
    const cognitive = badanteDetails?.cognitiveState

    const isFullySelfSufficient = selfSufficient === 'completamenteAutosufficiente'
    const isPartlySelfSufficient = selfSufficient === 'abbastanzaAutosufficiente'
    const isLucid = cognitive === 'lucido'
    const hasEarlyDeficit = cognitive === 'primiDeficit'

    if (isFullySelfSufficient && isLucid) return 'AS'
    if (isFullySelfSufficient && hasEarlyDeficit) return 'BS'
    if (isPartlySelfSufficient && (isLucid || hasEarlyDeficit)) return 'BS'
    return getCareLevel(badanteDetails)
}


const getLevel = (data) => {
    if (data.serviceType === 'colf') {
        return getColfLevel(data.colfDetails)
    }
    if (data.serviceType === 'babysitter') {
        return 'BS'
    }
    if (data.serviceType === 'badante') {
        return getBadanteLevel(data.badanteDetails)
    }
    throw new Error('Inquadramento non riconosciuto')
}


////// ---------- CONTROLLO TABELLA/LIVELLO ---------/////

const isLevelInTable = (table, level) => {
    const levelsOfTable = Object.keys(minimiRetributivi.tabella[table].livelli)
    return levelsOfTable.includes(level)
}

// Se il livello non esiste nel part-time (TABELLA B), si usa la tabella dei conviventi (TABELLA A)
const checkTable = (table, level, hours) => {
    if(table==='B' && hours>30)
        return 'A'
    if (isLevelInTable(table, level)) 
        return table
    if (table === 'B' && isLevelInTable('A', level)) 
        return 'A'
    throw new Error(`Il livello ${level} non è previsto dal contratto per questa tabella`)
}

////// ---------- MAGGIORAZIONI ---------/////

const isYoungerThanSix = (birthDate) => {
    if (!birthDate) return false
    const sixYearsAgo = new Date()
    sixYearsAgo.setFullYear(sixYearsAgo.getFullYear() - 6)

    return new Date(birthDate) > sixYearsAgo
}

const isConditionMet = (condition, data) => {
    if (condition === 'sempre') 
        return true
    if (condition === 'minori6Anni') 
        return isYoungerThanSix(data.babySitterDetails?.dateOfBirthYoungest)
    if (condition === '2Assistiti') 
        return data.badanteDetails?.numberOfAssisted > 1
    return false
}

const getIndennita = (data, table, level) => {
    const indennita = minimiRetributivi.tabella[table].indennita
    return indennita
        .filter((indennita) => indennita.livelli.includes(level))
        .filter((indennita) => isConditionMet(indennita.condizione, data))
        .map((indennita) => indennita.condizione)
}

////// ---------- FUNZIONE PRINCIPALE ---------/////

export const calculateInquadramento = (data) => {
    const level = getLevel(data)
    const table = getTable(data.workRequest)
        if(table ==='D' && level ==='AS'){
            return{
                inquadramento: 'E',
                livello: 'livelloUnico',
                maggiorazioni: []
            }
        }
    const finalTable = checkTable(table, level, data.oreSettimanali)
    const indennita = getIndennita(data, finalTable, level)

    return {
        inquadramento: finalTable,
        livello: level,
        maggiorazioni: indennita,
    }
}