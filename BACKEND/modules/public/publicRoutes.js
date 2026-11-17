import express from 'express'
import { createApplication, getPublicRequests } from './publicController.js'

const publicRouter = express.Router()

publicRouter.get('/requests', getPublicRequests)
publicRouter.post('/requests/:id/apply', createApplication)

export default publicRouter