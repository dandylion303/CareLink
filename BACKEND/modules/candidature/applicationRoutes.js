import express from 'express'
import { checkToken } from '../../middlewares/checkToken.js'
import { checkRole } from '../../middlewares/checkRole.js'
import { getApplications } from './applicationController.js'

const applicationRouter = express.Router()

applicationRouter.get('/', checkToken, checkRole('admin', 'sede'), getApplications)

export default applicationRouter