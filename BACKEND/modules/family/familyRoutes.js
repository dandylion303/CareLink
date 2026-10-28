import express from 'express'
import { checkRole } from '../../middlewares/checkRole.js'
import { checkToken } from '../../middlewares/checkToken.js'
import { createFamily, deleteFamily, getAllFamilies, getFamilyById, updateFamily } from './familyController.js'

const familyRouter = express.Router()

familyRouter.get('/', checkToken, checkRole('admin','sede'),getAllFamilies)
familyRouter.get('/:id', checkToken, checkRole('admin','sede'), getFamilyById)
familyRouter.post('/', checkToken, checkRole('sede'), createFamily)
familyRouter.patch('/:id', checkToken, checkRole('sede'), updateFamily)
familyRouter.delete('/:id', checkToken, checkRole('admin'), deleteFamily)

export default familyRouter