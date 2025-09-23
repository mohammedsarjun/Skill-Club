import express from 'express'
import { Request } from 'express';
import { AdminCategoryController } from '../controllers/adminController/adminCategoryController.js';
import { AdminSpecialityController } from '../controllers/adminController/adminSpecialityController.js';
import { container } from "tsyringe";
import { categoryValidationSchema } from '../utils/validationSchemas/categoryValidation.js';
import { specialityValidationSchema } from '../utils/validationSchemas/specialityValidations.js';
import { validate } from '../middlewares/validate.js';
import { authMiddleware, roleGuard } from '../middlewares/authMiddleware.js';
import { AdminAuthController } from '../controllers/adminController/adminAuthController.js';
const adminRouter = express.Router()


const categoryController=container.resolve(AdminCategoryController)
const adminAuthController=container.resolve(AdminAuthController)
//auth
adminRouter.post("/login",adminAuthController.login.bind(adminAuthController))

adminRouter.get("/categories",authMiddleware,roleGuard("admin"),categoryController.getAllCategory.bind(categoryController))
adminRouter.post("/categories",authMiddleware,roleGuard("admin"),validate(categoryValidationSchema),categoryController.addCategory.bind(categoryController))
adminRouter.patch("/categories",authMiddleware,roleGuard("admin"),categoryController.editCategory.bind(categoryController))

//speacialty
const specialityController=container.resolve(AdminSpecialityController)
adminRouter.post("/speciality",authMiddleware,roleGuard("admin"),validate(specialityValidationSchema),specialityController.addSpeciality.bind(specialityController))
adminRouter.get("/speciality",authMiddleware,roleGuard("admin"),specialityController.getAllSpeciality.bind(specialityController))
adminRouter.patch("/speciality",authMiddleware,roleGuard("admin"),specialityController.editSpeciality.bind(specialityController))
export default adminRouter