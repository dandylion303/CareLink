import Worker from "./Worker.js"
import { profileFilter } from "../../utils/sedeFilter.js"

export const getAllWorkers = async (req, res, next) => {
    try {
        const allWorkers = await Worker.find(profileFilter(req.user))
        res.status(200).json(allWorkers)
    } catch (error) {
        next(error)
    }
}

export const createWorker = async (req, res, next) => {
    try {
        const newWorker = await Worker.create({ ...req.body, sede: req.user.sede })
        res.status(201).json(newWorker)
    } catch (error) {
        next(error)
    }
}

export const getWorkerById = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleWorker = await Worker.findOne({ _id: id, ...profileFilter(req.user) })
        if (!singleWorker) {
            res.status(404).json({ message: 'Carer non trovato' })
        } else {
            res.status(200).json(singleWorker)
        }
    } catch (error) {
        next(error)
    }
}

export const updateWorker = async (req, res, next) => {
    try {
        const id = req.params.id
        const { sede, privacyConsent, ...otherData } = req.body
        const updatedWorker = await Worker.findOneAndUpdate(
            { _id: id, ...profileFilter(req.user) },
            otherData,
            { new: true, runValidators: true }
        )
        if (!updatedWorker) {
            res.status(404).json({ message: 'Carer non trovato' })
        } else {
            res.status(200).json(updatedWorker)
        }

    } catch (error) {
        next(error)
    }
}

export const deleteWorker = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedWorker = await Worker.findOneAndDelete({ _id: id, ...profileFilter(req.user) })
        if (!deletedWorker) {
            res.status(404).json({ message: 'Nessun Carer da cancellare' })
        } else {
            res.status(204).send()
        }
    } catch (error) {
        next(error)
    }
}