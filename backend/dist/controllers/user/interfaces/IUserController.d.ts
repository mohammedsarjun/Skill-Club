import { Request, Response } from 'express';
export interface IUserController {
    selectRole(req: Request, res: Response): Promise<void>;
    me(req: Request, res: Response): void;
    createFreelancerProfile(req: Request, res: Response): Promise<void>;
    createClientProfile(req: Request, res: Response): Promise<void>;
    switchRole(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=IUserController.d.ts.map