import Sede from "./Sede.js"

export const getAllSedi = async (req, res, next) => {
    try {
        const allSedi = await Sede.find()
        res.status(200).json(allSedi)
    } catch (error) {
        next(error)

    }
}

export const getSedeById = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleSede = await Sede.findById(id)
        if (!singleSede) {
            res.status(404).json({ message: 'nessuna sede trovata' })
        } else {
            res.status(200).json(singleSede)
        }

    } catch (error) {
        next(error)
    }
}

export const updateSede = async (req, res, next) => {
    try {
        const id = req.params.id
        const updatedSede = await Sede.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        )
        if(!updatedSede){
            res.status(404).json({message:'sede non trovata'})
        } else {
        res.status(200).json(updatedSede)}
    } catch (error) {
        next(error)
    }
}

export const createSede = async (req, res, next) => {
    try {
        const newSede = await Sede.create(req.body)
        res.status(201).json(newSede)
    } catch (error) {
        next(error)
    }
}

export const deactivateSede = async (req, res, next) => {
    try {
        const id = req.params.id
        const deactivatedSede = await Sede.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true, runValidators: true }
        )
        if(!deactivatedSede){
            res.status(404).json({message:'sede non trovata'})
        }else{
        res.status(200).json(deactivatedSede)}
    } catch (error) {
        next(error)
    }
}