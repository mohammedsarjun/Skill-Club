import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import { IAdminSkillController } from './interfaces/IAdminSkillController.js';
import '../../config/container.js';

import { HttpStatus } from '../../enums/http-status.enum.js';
import type { IAdminSkillServices } from '../../services/adminServices/interfaces/IAdminSkillServices.js';
import {
  mapCreateSkillDtoToSkillModel,
  mapSkillQuery,
  mapUpdateSkillDtoToSkillModel,
} from '../../mapper/adminMapper/skill.mapper.js';

@injectable()
export class AdminSkillController implements IAdminSkillController {
  private _adminSkillServices: IAdminSkillServices;

  constructor(
    @inject('IAdminSkillServices')
    adminSkillServices: IAdminSkillServices,
  ) {
    this._adminSkillServices = adminSkillServices;
  }

  async addSkill(req: Request, res: Response): Promise<void> {
    try {
      const dto = mapCreateSkillDtoToSkillModel(req.body);
      const result = await this._adminSkillServices.addSkill(dto);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: 'Skill created successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  async getSkills(req: Request, res: Response): Promise<void> {
    try {
      const dto = mapSkillQuery(req.query);
      const result = await this._adminSkillServices.getSkills(dto);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Skills Fetched successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  async editSkill(req: Request, res: Response): Promise<void> {
    try {
      const dto = mapUpdateSkillDtoToSkillModel(req.body);
      const {id}=req.body
      const result = await this._adminSkillServices.editSkill(id,dto);
      res.status(HttpStatus.OK).json({
        success: true,
        message: 'Skills Updated successfully',
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }
}
