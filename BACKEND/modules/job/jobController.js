import Job from "./Job.js";
import Worker from "../worker/Worker.js";
import Request from "../request/Request.js";
import { profileFilter } from "../../utils/sedeFilter.js";

export const getAllJobs = async (req, res, next)=>{
    try {
        const allJobs = await Job.find(profileFilter(req.user))
        res.status(200).json(allJobs)
    } catch (error) {
        next(error)
    }
}

export const createJob = async (req, res, next)=>{
    try {
        const foundCarer = await Worker.findOne({_id:req.body.worker,...profileFilter(req.user)})
        const foundRequest = await Request.findOne({_id:req.body.request, ...profileFilter(req.user)})
        if(!foundCarer||!foundRequest){
            return res.status(404).json({message:'Non ho trovato nulla con questi parametri'})
        } else {
            const newJob = await Job.create({
                ...req.body,
                family: foundRequest.famiglia,
                inquadramento: foundRequest.inquadramento,
                livello: foundRequest.livello,
                oreSettimanali: foundRequest.oreSettimanali,
                sede:req.user.sede
            })
            res.status(201).json(newJob)
        }
    } catch (error) {
        next(error)
    }
}

export const getJobById = async (req, res, next)=>{
    try {
        const id = req.params.id
        const singleJob = await Job.findOne({ _id:id, ...profileFilter(req.user)})
        if(!singleJob){
            res.status(404).json({message:'Rapporto di lavoro non trovato'})
        } else {
            res.status(200).json(singleJob)
        }
    } catch (error) {
        next(error)
    }
}

export const updateJob = async (req, res, next) =>{
    try {
        const id = req.params.id
        const {sede, family, worker, request, ...otherData} = req.body
        const updatedJob = await Job.findOneAndUpdate(
            {_id:id, ...profileFilter(req.user)},
            otherData,
            {new: true, runValidators:true}
        )
        if(!updatedJob){
            res.status(404).json({message:'Rapporto di lavoro non trovato'})
        } else {
            res.status(200).json(updatedJob)
        }

    } catch (error) {
        next(error)
    }
}