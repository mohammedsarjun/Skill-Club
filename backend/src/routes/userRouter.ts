import express from 'express'

import { UserController } from '../controllers/user/userController.js'
import { container } from 'tsyringe'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { UserCategoryController } from '../controllers/user/userCategoryController.js'
import { UserSpecialityController } from '../controllers/user/userSpecialityController.js'
const userRouter = express.Router()

const userController = container.resolve(UserController)
const userCategoryController=container.resolve(UserCategoryController)
const userSpecialityController=container.resolve(UserSpecialityController)
userRouter.post("/role",authMiddleware,userController.selectRole.bind(userController))
userRouter.get("/me",authMiddleware,userController.me.bind(userController))
userRouter.get("/profile",authMiddleware,userController.me.bind(userController))
userRouter.post("/freelancer",authMiddleware,userController.createFreelancerProfile.bind(userController))
userRouter.post("/client",authMiddleware,userController.createClientProfile.bind(userController))
userRouter.get("/switch-role",authMiddleware,userController.switchRole.bind(userController))
userRouter.get("/categories",authMiddleware,userCategoryController.getAllCategory.bind(userCategoryController))
userRouter.get("/specialities",authMiddleware,userSpecialityController.getSpecialities.bind(userSpecialityController))
export default userRouter