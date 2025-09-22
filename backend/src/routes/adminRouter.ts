import express from 'express'
import { Request } from 'express';
import { AdminCategoryController } from '../controllers/adminController/adminCategoryController.js';
import { AdminSpecialityController } from '../controllers/adminController/adminSpecialityController.js';
import { container } from "tsyringe";
import { categoryValidationSchema } from '../utils/validationSchemas/categoryValidation.js';
import { specialityValidationSchema } from '../utils/validationSchemas/specialityValidations.js';
import { validate } from '../middlewares/validate.js';
const adminRouter = express.Router()


const categoryController=container.resolve(AdminCategoryController)

adminRouter.get("/categories",categoryController.getAllCategory.bind(categoryController))
adminRouter.post("/categories",validate(categoryValidationSchema),categoryController.addCategory.bind(categoryController))
adminRouter.patch("/categories",categoryController.editCategory.bind(categoryController))

//speacialty
const specialityController=container.resolve(AdminSpecialityController)
adminRouter.post("/speciality",validate(specialityValidationSchema),specialityController.addSpeciality.bind(specialityController))
adminRouter.get("/speciality",specialityController.getAllSpeciality.bind(specialityController))
adminRouter.patch("/speciality",specialityController.editSpeciality.bind(specialityController))
export default adminRouter