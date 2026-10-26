export const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(e => e.message)
        return res.status(400).json({
            status: 'fail',
            message: 'errore di validazione dei dati',
            errors: errors
        })
    } else if (error.name === 'CastError') {
        return res.status(400).json({
            status: 'invalid ID',
            message: 'ID non valido'
        })
    } else if (error.code === 11000) {
        return res.status(409).json({
            status: 'dato duplicato',
            message: 'il dato esiste già nel database'
        })
    }
    else {
        res.status(500).json({
            status: 'errore del server',
            message: 'Si è verificato un errore, riprova'
        })
    }
}