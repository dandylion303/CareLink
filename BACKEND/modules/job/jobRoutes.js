import express from 'express'
import { checkRole } from '../../middlewares/checkRole.js'
import { checkToken } from '../../middlewares/checkToken.js'
import { createJob, getAllJobs, getJobById, updateJob } from './jobController.js'


const jobRouter=express.Router()

jobRouter.get('/', checkToken, checkRole('admin','sede'), getAllJobs)
jobRouter.get('/:id', checkToken, checkRole('admin','sede'),getJobById)
jobRouter.post('/',checkToken, checkRole('sede'),createJob)
jobRouter.patch('/:id', checkToken, checkRole('sede'), updateJob)

export default jobRouter
