import express from 'express'
import { checkToken } from '../../middlewares/checkToken.js'
import { checkRole } from '../../middlewares/checkRole.js'
import { createRequest, deleteRequest, getAllRequests, getSingleRequest, updateRequest } from './requestController.js'

const requestRouter = express.Router()

requestRouter.get('/', checkToken, checkRole('admin', 'sede'), getAllRequests)
requestRouter.get('/:id', checkToken, checkRole('admin', 'sede'), getSingleRequest)
requestRouter.post('/', checkToken, checkRole('sede'), createRequest)
requestRouter.patch('/:id', checkToken, checkRole('sede'), updateRequest)
requestRouter.delete('/:id', checkToken, checkRole('admin', 'sede'), deleteRequest)

export default requestRouter