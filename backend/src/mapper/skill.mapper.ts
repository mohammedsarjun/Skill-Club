import { ResSkillDtoMinimal } from '../dto/skill.dto';
import { ISkill } from '../models/interfaces/i-skill.model';

export const mapSkillModelToSpecialityDtoMinimal = (skill: ISkill): ResSkillDtoMinimal => {
  return {
    value: skill._id.toString(),
    label: skill.name,
  };
};
