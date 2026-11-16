import Job from "./Job.js";
import Worker from "../worker/Worker.js";
import Request from "../request/Request.js";
import { profileFilter } from "../../utils/sedeFilter.js";

export const getAllJobs = async (req, res, next) => {
    try {
        const filter = { ...profileFilter(req.user) }
        if (req.query.request) {
            filter.request = req.query.request
        }
        const allJobs = await Job.find(filter).populate('worker', 'nome lastName phone')
        res.status(200).json(allJobs)
    } catch (error) {
        next(error)
    }
}

export const createJob = async (req, res, next) => {
    try {
        const foundCarer = await Worker.findOne({ _id: req.body.worker, ...profileFilter(req.user) })
        const foundRequest = await Request.findOne({ _id: req.body.request, ...profileFilter(req.user) })
        if (!foundCarer || !foundRequest) {
            return res.status(404).json({ message: 'Non ho trovato nulla con questi parametri' })
        }

        if (foundCarer.status !== 'disponibile') {
            return res.status(400).json({ message: 'Questa carer non è al momento disponibile' })
        }

        else {
            const newJob = await Job.create({
                ...req.body,
                family: foundRequest.famiglia,
                inquadramento: foundRequest.inquadramento,
                livello: foundRequest.livello,
                oreSettimanali: foundRequest.oreSettimanali,
                durationType: foundRequest.durationType,
                startDate: foundRequest.startDate,
                status: 'proposta',
                endDate: foundRequest.endDate,
                sede: foundRequest.sede
            })
            foundCarer.status = 'non disponibile'
            await foundCarer.save()

            foundRequest.statusRichiesta = 'inProva'
            await foundRequest.save()
            res.status(201).json(newJob)
        }
    } catch (error) {
        next(error)
    }
}

export const getJobById = async (req, res, next) => {
    try {
        const id = req.params.id
        const singleJob = await Job.findOne({ _id: id, ...profileFilter(req.user) })
        if (!singleJob) {
            return res.status(404).json({ message: 'Rapporto di lavoro non trovato' })
        } else {
            res.status(200).json(singleJob)
        }
    } catch (error) {
        next(error)
    }
}

export const updateJob = async (req, res, next) => {
    try {
        const id = req.params.id
        const { sede, family, worker, request, ...otherData } = req.body
        const updatedJob = await Job.findOneAndUpdate(
            { _id: id, ...profileFilter(req.user) },
            otherData,
            { new: true, runValidators: true }
        )
        if (!updatedJob) {
            return res.status(404).json({ message: 'Rapporto di lavoro non trovato' })
        } else {
            res.status(200).json(updatedJob)
        }

    } catch (error) {
        next(error)
    }
}

export const rejectProposal = async (req, res, next) => {
    try {
        const id = req.params.id
        const proposal = await Job.findOne({ _id: id, ...profileFilter(req.user) })
        if (!proposal) {
            return res.status(404).json({ message: 'Proposta non trovata' })
        }

        if (proposal.status !== 'proposta') {
            return res.status(400).json({ message: 'Questa proposta è già stata chiusa' })
        }

        proposal.status = 'cessato'
        await proposal.save()

        const proposedCarer = await Worker.findById(proposal.worker)
        if (proposedCarer !== null) {
            proposedCarer.status = 'disponibile'
            await proposedCarer.save()
        }
        const otherProposals = await Job.find({ request: proposal.request, status: 'proposta' })
        if (otherProposals.length === 0) {
            const foundRequest = await Request.findById(proposal.request)
            if (foundRequest && foundRequest.statusRichiesta === 'inProva') {
                foundRequest.statusRichiesta = 'Attiva'
                await foundRequest.save()
            }
        }

        res.status(200).json(proposal)


    } catch (error) {
        next(error)
    }
}