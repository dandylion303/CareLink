import express from 'express'
import { checkRole } from '../../middlewares/checkRole.js'
import { checkToken } from '../../middlewares/checkToken.js'
import { getMatches } from './matchingController.js'

const matchRouter = express.Router()

matchRouter.get('/:requestId', checkToken, checkRole('admin', 'sede'), getMatches)

export default matchRouter