import Request from './Request.js'
import Family from '../family/Family.js'
import { profileFilter } from '../../utils/sedeFilter.js'


export const getAllRequests = async (req, res, next) => {
    try {
        const allRequests = await Request.find(profileFilter(req.user))
        res.status(200).json(allRequests)
    } catch (error) {
        next(error)
    }
}

export const createRequest = async (req, res, next) => {
    try {
        const searchFamily = await Family.findOne({ _id: req.body.famiglia, ...profileFilter(req.user) })
        if (!searchFamily) {
            return res.status(404).json({ message: 'famiglia non trovata' })
        } else {
            const newRequest = await Request.create({ ...req.body, sede: req.user.sede })
            res.status(201).json(newRequest)
        }
    } catch (error) {
        next(error)
    }
}

export const getSingleRequest = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleRequest = await Request.findOne({ _id: id, ...profileFilter(req.user) })
        if (!singleRequest) {
            res.status(404).json({ message: 'Richiesta non trovata' })
        } else {
            res.status(200).json(singleRequest)
        }
    } catch (error) {
        next(error)
    }
}
export const updateRequest = async (req, res, next) => {
    try {
        const id = req.params.id
        const { sede, famiglia, ...otherData } = req.body
        const updatedRequest = await Request.findOneAndUpdate(
            { _id: id, ...profileFilter(req.user) },
            otherData,
            { new: true, runValidators: true }
        )
        if (!updatedRequest) {
            res.status(404).json({ message: 'Richiesta non trovata' })
        } else {
            res.status(200).json(updatedRequest)
        }
    } catch (error) {
        next(error)
    }
}


export const deleteRequest = async (req, res, next)=>{
    try {
        const id = req.params.id
        const deletedRequest = await Request.findOneAndDelete({_id:id, ...profileFilter(req.user)})
        if(!deletedRequest){
            res.status(404).json({message:'Nessuna richiesta da cancellare'})
        }else{
            res.status(204).send()
        }
    } catch (error) {
        next(error)
    }
}