export const dizionarioRegime = (regime) => {
    switch (regime) {
        case 'convivente':
            return 'Convivente'
        case 'conviventePartTime':
            return 'art.15'
        case 'nonConvivente':
            return 'Non Convivente'
        case 'notturno':
            return 'Notturno'
        default:
            return regime
    }
}