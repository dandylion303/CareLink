import express from "express"
import { createUser, login } from "./authController.js"
import { checkToken } from "../../middlewares/checkToken.js"

const authRouter = express.Router()

authRouter.post('/register', checkToken, createUser)
authRouter.post('/login', login)


export default authRouter