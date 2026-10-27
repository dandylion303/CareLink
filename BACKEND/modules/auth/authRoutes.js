import express from "express"
import { createUser, login } from "./authController.js"
import { checkToken } from "../../middlewares/checkToken.js"
import { checkRole } from "../../middlewares/checkRole.js"

const authRouter = express.Router()

authRouter.post('/register', checkToken, checkRole('admin'), createUser)
authRouter.post('/login', login)


export default authRouter