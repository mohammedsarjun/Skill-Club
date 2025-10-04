import { Request, Response } from 'express';
import '../../config/container.js';
import { IClientController } from './interfaces/IClientController.js';
import type { IClientService } from '../../services/clientServices/interfaces/IClientServices.js';
export declare class ClientController implements IClientController {
    private _clientService;
    constructor(clientService: IClientService);
    getClientData(req: Request, res: Response): Promise<void>;
    updateClient(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=clientController.d.ts.map