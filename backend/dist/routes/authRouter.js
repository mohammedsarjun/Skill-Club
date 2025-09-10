import express from 'express';
import { AuthController } from '../controllers/auth/authController.js';
import { container } from "tsyringe";
const authRouter = express.Router();
const authController = container.resolve(AuthController);
authRouter.post("/signup", authController.signup.bind(authController));
export default authRouter;
//# sourceMappingURL=authRouter.js.map