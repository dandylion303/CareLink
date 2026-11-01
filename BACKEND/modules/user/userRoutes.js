import express from 'express'
import { checkRole } from '../../middlewares/checkRole.js'
import { checkToken } from '../../middlewares/checkToken.js'
import { deactivateUser, getAllUsers, getSingleUser } from './userController.js'

const userRouter = express.Router()

userRouter.get('/', checkToken, checkRole('admin'), getAllUsers)
userRouter.get('/:id', checkToken, checkRole('admin'), getSingleUser)
userRouter.patch('/:id/deactivate', checkToken, checkRole('admin'), deactivateUser)

export default userRouter