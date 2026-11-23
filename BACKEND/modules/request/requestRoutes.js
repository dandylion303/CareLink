import express from 'express'
import { checkToken } from '../../middlewares/checkToken.js'
import { checkRole } from '../../middlewares/checkRole.js'
import { closeRequest, createRequest, deleteRequest, getAllRequests, getSingleRequest, updateRequest, uploadIncarico } from './requestController.js'
import upload from '../../config/cloudinary.js'

const requestRouter = express.Router()

requestRouter.get('/', checkToken, checkRole('admin', 'sede'), getAllRequests)
requestRouter.get('/:id', checkToken, checkRole('admin', 'sede'), getSingleRequest)
requestRouter.post('/', checkToken, checkRole('sede'), createRequest)
requestRouter.patch('/:id', checkToken, checkRole('sede'), updateRequest)
requestRouter.delete('/:id', checkToken, checkRole('admin', 'sede'), deleteRequest)
requestRouter.patch('/:id/close', checkToken, checkRole('sede'), closeRequest)

requestRouter.patch('/:id/incarico', checkToken, checkRole('sede'),upload.single('file'), uploadIncarico)
export default requestRouter