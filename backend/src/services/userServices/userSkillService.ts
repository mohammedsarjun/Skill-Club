import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';

import { IUserSkillServices } from './interfaces/IUserSkillService.js';
import type { ISkillRepository } from '../../repositories/interfaces/ISkillRepository.js';
import { SkillDto } from '../../dto/adminDTO/skill.dto.js';
import { mapSkillModelToSkillDto } from '../../mapper/adminMapper/skill.mapper.js';
import { ResSkillDtoMinimal } from '../../dto/skill.dto.js';
import { mapSkillModelToSpecialityDtoMinimal } from '../../mapper/skill.mappper.js';

@injectable()
export class UserSkillServices implements IUserSkillServices {
  private _skillRepository: ISkillRepository;
  constructor(@inject('ISkillRepository') skillRepository: ISkillRepository) {
    this._skillRepository = skillRepository;
  }

  async getSuggestedSkills(specialities: string[]): Promise<ResSkillDtoMinimal[]|null> {
    console.log(specialities)
    const result = await this._skillRepository.getSuggestedSkills(specialities);
    // Map to DTO



    const dtoData: ResSkillDtoMinimal[] | null = result
      ? result.map(mapSkillModelToSpecialityDtoMinimal)
      : null;

    return dtoData;
  }
}
