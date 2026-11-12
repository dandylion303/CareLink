import Request from '../request/Request.js'
import Worker from '../worker/Worker.js'
import { profileFilter } from '../../utils/sedeFilter.js'
import { calculateMatch } from './matchingService.js'

export const getMatches = async (req, res, next)=>{
    try {
        const request = await Request.findOne({_id: req.params.requestId,...profileFilter(req.user)})
        if(!request){
            return res.status(404).json({message:'Richiesta non trovata'})
        }
        const allWorkers = await Worker.find({
            sede: request.sede, 
            status: 'disponibile', 
            jobTypes: request.serviceType,
        })
        const workers = allWorkers.filter((worker) => worker.warning.isFlagged === false)
        const results = workers.map((worker)=>{
            const match = calculateMatch(request, worker)
            return {
                worker: worker, 
                percentage: match.percentage,
                reasons: match.reasons,
            }
        })
        results.sort((carerA,carerB)=>{
            if(carerA.percentage > carerB.percentage){
                return -1
            }
            if (carerA.percentage < carerB.percentage){
                return 1
            }
            return 0
        })
        res.status(200).json(results)


    } catch (error) {
        next(error)
    }
}