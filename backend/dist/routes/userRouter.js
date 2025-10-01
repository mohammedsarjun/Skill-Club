import express from 'express';
import { UserController } from '../controllers/user/userController.js';
import { container } from 'tsyringe';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();
const userController = container.resolve(UserController);
userRouter.post("/role", authMiddleware, userController.selectRole.bind(userController));
userRouter.get("/me", authMiddleware, userController.me.bind(userController));
userRouter.post("/freelancer", authMiddleware, userController.createFreelancerProfile.bind(userController));
userRouter.post("/client", authMiddleware, userController.createClientProfile.bind(userController));
userRouter.get("/switch-role", authMiddleware, userController.switchRole.bind(userController));
export default userRouter;
//# sourceMappingURL=userRouter.js.map