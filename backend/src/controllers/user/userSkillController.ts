import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';
import '../../config/container.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { MESSAGES } from '../../contants/contants.js';
import { IUserSkillController } from './interfaces/IUserSkillController.js';
import type { IUserSkillServices } from '../../services/userServices/interfaces/IUserSkillService.js';
import { ResSkillDtoMinimal } from '../../dto/skill.dto.js';

@injectable()
export class UserSkillController implements IUserSkillController {
  private _userSkillService: IUserSkillServices;

  constructor(@inject('IUserSkillServices') userSkillService: IUserSkillServices) {
    this._userSkillService = userSkillService;
  }

  async getSuggestedSkills(req: Request, res: Response): Promise<void> {

      const { specialities } = req.query;
      const skills:ResSkillDtoMinimal[]|null = await this._userSkillService.getSuggestedSkills(specialities as string[]);

      res.status(HttpStatus.OK).json({
        success: true,
        message: MESSAGES.SKILL.FETCH_SUCCESS,
        data: skills,
      });

  }
}
