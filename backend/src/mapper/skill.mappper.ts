import { ResSkillDtoMinimal } from "../dto/skill.dto.js";
import { ISkill } from "../models/interfaces/ISkillModel.js";

export const mapSkillModelToSpecialityDtoMinimal = (
  skill: ISkill
):ResSkillDtoMinimal=> {
  return {
    value: skill._id.toString(),
    label: skill.name,
 
  };
};
