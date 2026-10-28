import Family from './Family.js'

import { profileFilter } from "../../utils/sedeFilter.js"

export const getAllFamilies = async (req, res, next) => {
    try {
        const allFamilies = await Family.find(profileFilter(req.user))
        res.status(200).json(allFamilies)
    } catch (error) {
        next(error)
    }
}

export const createFamily = async (req, res, next) => {
    try {
        const newFamily = await Family.create({ ...req.body, sede: req.user.sede })
        res.status(201).json(newFamily)
    } catch (error) {
        next(error)
    }
}

export const getFamilyById = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleFamily = await Family.findOne({ _id: id, ...profileFilter(req.user) })
        if (!singleFamily) {
            res.status(404).json({ message: 'Famiglia non trovata' })
        } else {
            res.status(200).json(singleFamily)
        }
    } catch (error) {
        next(error)
    }
}

export const updateFamily = async (req, res, next) => {
    try {
        const id = req.params.id
        const { sede, privacyConsent, ...otherData } = req.body
        const updatedFamily = await Family.findOneAndUpdate(
            { _id: id, ...profileFilter(req.user) },
            otherData,
            { new: true, runValidators: true }
        )
        if (!updatedFamily) {
            res.status(404).json({ message: 'Famiglia non trovata' })
        } else {
            res.status(200).json(updatedFamily)
        }

    } catch (error) {
        next(error)
    }
}

export const deleteFamily = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedFamily = await Family.findOneAndDelete({ _id: id, ...profileFilter(req.user) })
        if (!deletedFamily) {
            res.status(404).json({ message: 'Nessuna Famiglia da cancellare' })
        } else {
            res.status(204).send()
        }
    } catch (error) {
        next(error)
    }
}