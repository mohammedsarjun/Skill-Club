import express from 'express'
import { AuthController } from '../controllers/auth/authController.js'

const authRouter = express.Router()

authRouter.post("/signup",AuthController)


export default authRouter