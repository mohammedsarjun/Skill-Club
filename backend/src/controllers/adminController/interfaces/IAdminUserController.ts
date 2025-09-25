import { Request, Response } from "express";

export interface IAdminUserController {
  getUserStats(req: Request, res: Response): Promise<void>;

}
