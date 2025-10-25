import express from 'express';

import { container } from 'tsyringe';
import { authMiddleware, roleGuard } from '../middlewares/auth-middleware';

import { ClientController } from '../controllers/client/client-controller';
import { clientBlockMiddleware } from '../middlewares/client-block-middleware';
import { ClientJobController } from'../controllers/client/client-job-controller';
import { ClientCategoryController } from '../controllers/client/client-category-controller';
const clientRouter = express.Router();

const clientController = container.resolve(ClientController);
const clientJobController=container.resolve(ClientJobController)
const clientCategoryController=container.resolve(ClientCategoryController)

clientRouter.get(
  '/me',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientController.getClientData.bind(clientController),
);
clientRouter.patch(
  '/update',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientController.updateClient.bind(clientController),
);

clientRouter.post(
  '/jobs',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientJobController.createJob.bind(clientJobController),
);

clientRouter.get(
  '/categories',
  authMiddleware,
  roleGuard('client'),
  clientBlockMiddleware,
  clientCategoryController.getAllCategories.bind(clientCategoryController),
);
export default clientRouter;
