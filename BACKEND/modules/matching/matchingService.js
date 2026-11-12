import matchingCriteri from "../../config/matchingCriteri.js"

export const matchingRegime = (request, worker) => {
    const max = matchingCriteri.regime
    if (worker.regimes.includes(request.workRequest)) {
        return { points: max, max: max, reason: 'il regime richiesto dalla famiglia è tra quelli accettati dalla Carer' }
    } else {
        return {
            points: 0,
            max: max,
            reason: null
        }
    }
}

export const matchingRating = (request, worker) => {
    const max = matchingCriteri.rating
    const points = (max * (worker.rating || 0)) / 10
    return {
        points: points,
        max: max,
        reason: !worker.rating
            ? 'valutazione non ancora assegnata dalla sede'
            : `valutazione assegnata dalla sede ${worker.rating}/10`
    }
}

export const matchingBaseExperience = (request, worker) => {
    const max = matchingCriteri.baseExperience
    if (request.serviceType === "colf") {
        return null
    }
    if (request.serviceType === 'badante'
        && worker.experienceWith.includes('anziani')) {
        return {
            points: max,
            max: max,
            reason: 'Carer con esperienza pregressa con anziani',
        }
    }
    if (request.serviceType === 'babysitter'
        && (worker.experienceWith.includes('neonati')
            || worker.experienceWith.includes('bambini'))) {
        return {
            points: max,
            max: max,
            reason: 'Carer con esperienza pregressa con bambini'
        }
    }
    else {
        return {
            points: 0,
            max: max,
            reason: null
        }
    }
}




export const matchingBedRidden = (request, worker) => {
    const max = matchingCriteri.bedridden
    if (request.serviceType !== "badante") {
        return null
    }
    if (request.badanteDetails?.mobility !== 'allettato'
        && request.badanteDetails?.mobility !== 'carrozzina') {
        return null
    }
    //caso migliore = esperienza sia con allettati che con sollevatore
    if (worker.experienceWith?.includes('allettati')
        && worker.skills?.includes('sollevatore')) {
        return {
            points: max,
            max: max,
            reason: 'esperienza con allettati e sollevatore'
        }
    }
    //caso intermedio = esperienza con allettati oppure sollevatore
    if (worker.experienceWith?.includes('allettati')
        || worker.skills?.includes('sollevatore')) {
        return {
            points: max * 0.75,
            max: max,
            reason: 'ha esperienza nella movimentazione di persone non autonome'
        }
    }

    // Caso base: solo disponibilità agli sforzi fisici
    if (worker.availableFor?.includes('sforziFisici')) {
        return {
            points: max / 2,
            max: max,
            reason: 'è fisicamente prestante'
        }
    }

    return {
        points: 0,
        max: max,
        reason: null
    }
}

export const matchingTherapies = (request, worker) => {
    const max = matchingCriteri.therapies
    if (request.badanteDetails?.hasSpecialNeeds !== 'si') {
        return null
    }
    if (worker.experienceWith?.includes('PEG')
        || worker.experienceWith?.includes('oncologici')
        || worker.skills?.includes('ossigeno')) {
        return {
            points: max,
            max: max,
            reason: 'ha già esperienza con terapie strutturate'
        }
    }
    else {
        return {
            points: 0,
            max,
            reason: null
        }
    }
}


export const matchingDementia = (request, worker) => {
    const max = matchingCriteri.dementia
    if (request.badanteDetails?.cognitiveState !== 'demenzaAlzheimerGrave')
        return null
    if (worker.experienceWith.includes('alzheimerDemenza')) {
        return {
            points: max,
            max: max,
            reason: 'Ha già lavorato con le patologie richieste'
        }
    } else {
        return { points: 0, max: max, reason: null }
    }
}




export const matchingPets = (request, worker) => {
    const max = matchingCriteri.pets

    if (!(request.pets?.cani > 0) && !(request.pets?.gatti > 0)) {
        return null
    }

    // Caso 1: in casa ci sono cani e gatti
    if (request.pets?.cani > 0 && request.pets?.gatti > 0) {
        if (worker.acceptedPets?.includes('cani') && worker.acceptedPets?.includes('gatti')) {
            return {
                points: max,
                max,
                reason: 'accetta cani e gatti'
            }
        }
        if (worker.acceptedPets?.includes('cani')) {
            return {
                points: max / 2,
                max,
                reason: 'accetta i cani, ma non i gatti'
            }
        }
        if (worker.acceptedPets?.includes('gatti')) {
            return {
                points: max / 2,
                max,
                reason: 'accetta i gatti, ma non i cani'
            }
        }
        return { points: 0, max, reason: null }
    }

    // Caso 2: in casa ci sono solo cani
    if (request.pets?.cani > 0) {
        if (worker.acceptedPets?.includes('cani')) {
            return {
                points: max,
                max,
                reason: 'accetta i cani'
            }
        }
        return {
            points: 0,
            max,
            reason: null
        }
    }

    // Caso 3: in casa ci sono solo gatti
    if (worker.acceptedPets?.includes('gatti')) {
        return {
            points: max,
            max,
            reason: 'accetta i gatti'
        }
    }
    return {
        points: 0,
        max,
        reason: null
    }
}

export const matchingSostituzioni = (request, worker) => {
    const max = matchingCriteri.sostituzioni
    if (request.durationType !== 'determinato') {
        return null
    }
    if (worker.availableFor.includes('sostituzioni')) {
        return {
            points: max,
            max: max,
            reason: 'disponibile per brevi periodi'
        }
    } else {
        return { points: 0, max: max, reason: null }
    }
}

export const matchingColfSkills = (request, worker) => {
    const max = matchingCriteri.colfSkills

    // Si applica solo se alla colf sono richieste competenze specifiche
    if (request.serviceType !== 'colf'
        || !(request.colfDetails?.specificCompetenceNeeded?.length > 0)) {
        return null
    }

    if (request.colfDetails.specificCompetenceNeeded.includes('cucinare')
        && worker.skills?.includes('cucinare')) {
        return {
            points: max,
            max,
            reason: 'sa cucinare'
        }
    }
    if (request.colfDetails.specificCompetenceNeeded.includes('stirare')
        && worker.skills?.includes('stirare')) {
        return {
            points: max,
            max,
            reason: 'sa stirare'
        }
    }
    if (request.colfDetails.specificCompetenceNeeded.includes('giardinaggio')
        && worker.skills?.includes('giardinaggio')) {
        return {
            points: max,
            max,
            reason: 'sa occuparsi del giardino'
        }
    }
    if (request.colfDetails.specificCompetenceNeeded.includes('autista')
        && worker.hasDrivingLicense === true) {
        return {
            points: max,
            max,
            reason: 'può fare da autista'
        }
    }

    return {
        points: 0,
        max,
        reason: null
    }

}

export const matchingPatente = (request, worker) => {
    const max = matchingCriteri.patente
    if (request.requiredDrivingLicense !== true) {
        return null
    }
    if (worker.hasDrivingLicense === true
    ) {
        return {
            points: max,
            max,
            reason: 'Sa guidare'
        }
    } else {
        return { points: 0, max: max, reason: null }
    }
}

export const matchingCity = (request, worker) => {
    const max = matchingCriteri.sameCity
    if (request.workAddress?.city?.toLowerCase() === worker?.city?.toLowerCase()) {
        return {
            points: max,
            max: max,
            reason: 'abita nella stessa città'
        }
    } else {
        return { points: 0, max: max, reason: null }
    }
}


const criteria = [
    matchingRegime,
    matchingRating,
    matchingBaseExperience,
    matchingBedRidden,
    matchingTherapies,
    matchingDementia,
    matchingPets,
    matchingSostituzioni,
    matchingColfSkills,
    matchingPatente,
    matchingCity,
]

export const calculateMatch = (request, worker) => {
    let totalPointsPresi = 0
    let totalMaxPossibilePoints = 0
    const reasons = []

    for (const criterion of criteria) {
        const result = criterion(request, worker)
        if (result === null) continue
         totalPointsPresi = totalPointsPresi + result.points
         totalMaxPossibilePoints = totalMaxPossibilePoints + result.max

        if (result.reason !== null) {
            reasons.push(result.reason)
        }

    }
    return {
        percentage: Math.round(totalPointsPresi / totalMaxPossibilePoints * 100),
        reasons,
    }
}