import { ISkill } from "../models/interfaces/ISkillModel.js";
import { skillModel } from "../models/skillModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import { ISkillRepository } from "./interfaces/ISkillRepository.js";



export class SkillRepository extends BaseRepository<ISkill> implements ISkillRepository {

    constructor(){
        super(skillModel)
    }
    getSuggestedSkills(specialities: string[]): Promise<ISkill[] | null> {
        return this.findAll({specialities:{$in:specialities}})
    }
}