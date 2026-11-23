import Request from './Request.js'
import Family from '../family/Family.js'
import { profileFilter } from '../../utils/sedeFilter.js'
import { calculateInquadramento } from './requestService.js'
import Job from '../job/Job.js'
import Worker from '../worker/Worker.js'


export const getAllRequests = async (req, res, next) => {
    try {
        const allRequests = await Request
        .find(profileFilter(req.user))
        .populate('famiglia', 'customerName customerLastname')
        .sort({createdAt:-1})
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
            const calculated = calculateInquadramento(req.body)
            const newRequest = await Request.create({ ...req.body, ...calculated, sede: req.user.sede })
            res.status(201).json(newRequest)
        }
    } catch (error) {
        next(error)
    }
}

export const getSingleRequest = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleRequest = await Request
            .findOne({ _id: id, ...profileFilter(req.user) })
            .populate('famiglia')
            .populate('sede')
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


export const deleteRequest = async (req, res, next) => {
    try {
        const id = req.params.id
        const deletedRequest = await Request.findOneAndDelete({ _id: id, ...profileFilter(req.user) })
        if (!deletedRequest) {
            res.status(404).json({ message: 'Nessuna richiesta da cancellare' })
        } else {
            res.status(204).send()
        }
    } catch (error) {
        next(error)
    }
}

export const closeRequest = async (req, res, next) => {
    try {
        const foundRequest = await Request.findOne({ _id: req.params.id, ...profileFilter(req.user) })
        if (!foundRequest) {
            return res.status(404).json({ message: 'Richiesta non trovata' })
        }
        if (foundRequest.statusRichiesta === 'Chiusa') {
            return res.status(400).json({ message: 'La richiesta risulta già conclusa' })
        }
        foundRequest.statusRichiesta = 'Chiusa'
        await foundRequest.save()
        const proposals = await Job.find({ request: foundRequest._id, status: 'proposta' })

        for (const proposal of proposals) {
            const worker = await Worker.findById(proposal.worker)
            if (proposal._id.toString() === req.body.chosenJob) {
                proposal.status = 'attivo'
            } else {
                proposal.status = 'cessato'
                if (worker) {
                    worker.status = 'disponibile'
                    await worker.save()
                }
            } await proposal.save()
        }
        res.status(200).json(foundRequest)
    }

    catch (error) {
        next(error)
    }
}


export const uploadIncarico = async (req, res, next)=>{
    try {
        const id = req.params.id
        if(!req.file){
            return res.status(400).json('Nessun file caricato')
        }
        const specificRequest = await Request.findOne({_id: id, ...profileFilter(req.user)})
        if(!specificRequest){
            return res.status(404).json({message:'Non trovo la richiesta'})
        }
        if(specificRequest.statusRichiesta==='Chiusa'){
            return res.status(400).json({message:'La richiesta risulta già chiusa'})
        }
        if(specificRequest.statusRichiesta==='inAttesa' && !specificRequest.serviceFee){
            return res.status(400).json({message:'è necessario inserire il costo del servizio'})
        } else {
            specificRequest.signedIncarico = {url:req.file.path, uploadedAt: new Date()}
            if(specificRequest.statusRichiesta==='inAttesa'){
                specificRequest.statusRichiesta='Attiva'
            }
            await specificRequest.save()
            return res.status(200).json(specificRequest) 
        }


    } catch (error) {
        next(error)
    }
}