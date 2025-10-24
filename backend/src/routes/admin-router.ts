import express from 'express';
import { AdminCategoryController } from '../controllers/admin/admin-category-controller';
import { AdminSpecialityController } from '../controllers/admin/admin-speciality-controller';
import { container } from 'tsyringe';
import { categoryValidationSchema } from '../utils/validationSchemas/category-validation';
import { specialityValidationSchema } from '../utils/validationSchemas/speciality-validations';
import { validate } from '../middlewares/validation-middleware';
import { authMiddleware, roleGuard } from '../middlewares/auth-middleware';
import { AdminAuthController } from '../controllers/admin/admin-auth-controller';
import { AdminUserController } from '../controllers/admin/admin-user-controller';
import { AdminSkillController } from '../controllers/admin/admin-skill-controller';
import { skillSchema } from '../utils/validationSchemas/skill-validation';

const adminRouter = express.Router();

const categoryController = container.resolve(AdminCategoryController);
const adminAuthController = container.resolve(AdminAuthController);
//auth
adminRouter.post('/login', adminAuthController.login.bind(adminAuthController));
adminRouter.get(
  '/me',
  authMiddleware,
  roleGuard('admin'),
  adminAuthController.me.bind(adminAuthController),
);
adminRouter.post('/logout', adminAuthController.logout.bind(adminAuthController));
//category
adminRouter.get(
  '/categories',
  authMiddleware,
  roleGuard('admin'),
  categoryController.getAllCategory.bind(categoryController),
);
adminRouter.post(
  '/categories',
  authMiddleware,
  roleGuard('admin'),
  validate(categoryValidationSchema),
  categoryController.addCategory.bind(categoryController),
);
adminRouter.patch(
  '/categories',
  authMiddleware,
  roleGuard('admin'),
  categoryController.editCategory.bind(categoryController),
);

//specialty
const specialityController = container.resolve(AdminSpecialityController);
adminRouter.post(
  '/speciality',
  authMiddleware,
  roleGuard('admin'),
  validate(specialityValidationSchema),
  specialityController.addSpeciality.bind(specialityController),
);
adminRouter.get(
  '/speciality',
  authMiddleware,
  roleGuard('admin'),
  specialityController.getAllSpeciality.bind(specialityController),
);
adminRouter.patch(
  '/speciality',
  authMiddleware,
  roleGuard('admin'),
  specialityController.editSpeciality.bind(specialityController),
);

//skills
const skillController = container.resolve(AdminSkillController);
adminRouter.post(
  '/skill',
  authMiddleware,
  roleGuard('admin'),
  validate(skillSchema),
  skillController.addSkill.bind(skillController),
);
adminRouter.get(
  '/skill',
  authMiddleware,
  roleGuard('admin'),
  skillController.getSkills.bind(skillController),
);
adminRouter.patch(
  '/skill',
  authMiddleware,
  roleGuard('admin'),
  skillController.editSkill.bind(skillController),
);
//users,
const adminUserController = container.resolve(AdminUserController);
adminRouter.get('/users-stats', adminUserController.getUserStats.bind(adminUserController));
adminRouter.get('/users', adminUserController.getUsers.bind(adminUserController));
adminRouter.get('/user', adminUserController.getUserDetail.bind(adminUserController));
adminRouter.patch(
  '/user/updateStatus',
  adminUserController.updateUserStatus.bind(adminUserController),
);
export default adminRouter;
