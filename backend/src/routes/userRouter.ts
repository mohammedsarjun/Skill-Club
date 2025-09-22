import express from 'express'

import { UserController } from '../controllers/user/userController.js'
import { container } from 'tsyringe'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const userRouter = express.Router()

const userController = container.resolve(UserController)
userRouter.post("/role",authMiddleware,userController.selectRole.bind(userController))

export default userRouter