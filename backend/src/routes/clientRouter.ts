import express from 'express'

import { container } from 'tsyringe'
import { authMiddleware, roleGuard } from '../middlewares/authMiddleware.js'

import { ClientController } from '../controllers/client/clientController.js'
const clientRouter = express.Router()

const clientController = container.resolve(ClientController)

clientRouter.get("/me",authMiddleware,roleGuard("client"),clientController.getClientData.bind(clientController))
clientRouter.patch("/update",authMiddleware,roleGuard("client"),clientController.updateClient.bind(clientController))
export default clientRouter