import express from 'express'
import { Request } from 'express';
import { AdminCategoryController } from '../controllers/adminController/adminCategoryController.js';
import { container } from "tsyringe";
import { categoryValidationSchema } from '../utils/validationSchemas/categoryValidation.js';
import { validate } from '../middlewares/validate.js';
const adminRouter = express.Router()


const categoryController=container.resolve(AdminCategoryController)
adminRouter.post("/categories",validate(categoryValidationSchema),categoryController.addCategory.bind(categoryController))
adminRouter.get("/categories",categoryController.getAllCategory.bind(categoryController))

export default adminRouter