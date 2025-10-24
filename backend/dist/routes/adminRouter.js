import express from 'express';
import { AdminCategoryController } from '../controllers/admin/adminCategoryController.js';
import { AdminSpecialityController } from '../controllers/admin/adminSpecialityController.js';
import { container } from 'tsyringe';
import { categoryValidationSchema } from '../utils/validationSchemas/categoryValidation.js';
import { specialityValidationSchema } from '../utils/validationSchemas/specialityValidations.js';
import { validate } from '../middlewares/validate.js';
import { authMiddleware, roleGuard } from '../middlewares/authMiddleware.js';
import { AdminAuthController } from '../controllers/admin/adminAuthController.js';
import { AdminUserController } from '../controllers/admin/adminUserController.js';
import { AdminSkillController } from '../controllers/admin/adminSkillController.js';
import { skillSchema } from '../utils/validationSchemas/skillValidation.js';
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
//# sourceMappingURL=adminRouter.js.map
