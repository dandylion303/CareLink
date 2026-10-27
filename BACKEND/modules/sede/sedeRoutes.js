import express from "express"
import { checkToken } from "../../middlewares/checkToken.js"
import { checkRole } from "../../middlewares/checkRole.js"
import { createSede, deactivateSede, getAllSedi, getSedeById, updateSede } from "./sedeController.js"

const sedeRouter = express.Router()

sedeRouter.get('/', checkToken, checkRole('admin'), getAllSedi)
sedeRouter.get('/:id', checkToken, checkRole('admin'), getSedeById)
sedeRouter.post('/', checkToken, checkRole('admin'),createSede)
sedeRouter.put('/:id', checkToken, checkRole('admin'), updateSede)
sedeRouter.patch('/:id/deactivate',checkToken, checkRole('admin'), deactivateSede )


export default sedeRouter