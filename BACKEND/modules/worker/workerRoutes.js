import express from "express"
import { checkToken } from "../../middlewares/checkToken.js"
import { checkRole } from "../../middlewares/checkRole.js"
import { createWorker, deleteWorker, getAllWorkers, getWorkerById, updateWorker, addDocument } from "./workerController.js"
import upload from "../../config/cloudinary.js"

const workerRouter = express.Router()

workerRouter.get('/', checkToken, checkRole('admin', 'sede'), getAllWorkers)
workerRouter.get('/:id', checkToken, checkRole('admin', 'sede'), getWorkerById)
workerRouter.post('/', checkToken, checkRole('sede'), createWorker)
workerRouter.patch('/:id', checkToken, checkRole('sede'), updateWorker)
workerRouter.delete('/:id', checkToken, checkRole('admin','sede'), deleteWorker)

workerRouter.post('/:id/documents', checkToken, checkRole('sede'), upload.single('file'), addDocument)

export default workerRouter