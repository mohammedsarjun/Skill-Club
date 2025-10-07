import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import { IAdminSkillServices } from './interfaces/IAdminSkillServices.js';
import type { IAdminSkillRepository } from '../../repositories/adminRepositories/interfaces/IAdminSkillRepository.js';
import { mapCreateSkillDtoToSkillModel, mapSkillModelToSkillDto, mapSkillQuery, mapUpdateSkillDtoToSkillModel } from '../../mapper/adminMapper/skill.mapper.js';
import { CreateSkillDTO, GetSkillDto, SkillDto, UpdateSkillDTO } from '../../dto/adminDTO/skill.dto.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
@injectable()
export class AdminSkillServices implements IAdminSkillServices {
  private _adminSkillRepository;

  constructor(
    @inject('IAdminSkillRepository')
    adminSkillRepository: IAdminSkillRepository,
  ) {
    this._adminSkillRepository = adminSkillRepository;
  }

  async addSkill(skillData: CreateSkillDTO): Promise<any> {
    const skillDataDto=mapCreateSkillDtoToSkillModel(skillData)
    const existing = await this._adminSkillRepository.findOne({
      name: skillDataDto.name,
    });
    

    if (existing) {
      throw new AppError('Skill with this name already exists', HttpStatus.CONFLICT);
    }

    // Create speciality
    const created = await this._adminSkillRepository.create(skillDataDto);

    // Fetch with category populated
    const populated = await this._adminSkillRepository.findOne(
      { _id: created._id },
      { populate: { path: 'specialities', select: '_id name' } },
    );

    console.log(populated);

    if (!populated) {
      throw new AppError('Skills not found after creation', HttpStatus.NOT_FOUND);
    }
    const result = mapSkillModelToSkillDto(populated);
    return result;
  }

  async getSkills(filterData: GetSkillDto): Promise<any> {
    const filterDataDto = mapSkillQuery(filterData)
    const page = filterDataDto.page ?? 1;
    const limit = filterDataDto.limit ?? 10;
    const skip = (page - 1) * limit;
    const mode = filterDataDto.mode;

    const result = await this._adminSkillRepository.findAllWithFilters(
      {
        search: filterDataDto.search, // just values
      },
      {
        skip,
        limit,
        populate: { path: 'specialities', select: '_id name' },
      },
    );

    const total = await this._adminSkillRepository.count({
      name: filterDataDto.search || '',
    });

    // Map to DTO

    const data: SkillDto[] = result!.map(mapSkillModelToSkillDto);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async editSkill(id:string,skilldata: Partial<UpdateSkillDTO>): Promise<any> {
    // Check for duplicate name
     const skillDataDto=mapUpdateSkillDtoToSkillModel(skilldata)
    if (skillDataDto?.name) {
      const existing = await this._adminSkillRepository.findOne({ name: skillDataDto.name });
      if (existing && existing._id.toString() !== id) {
        throw new AppError(ERROR_MESSAGES.SKILL.ALREADY_EXIST, HttpStatus.CONFLICT);
      }
    }

    // Map DTO to model and update

    await this._adminSkillRepository.update(id, skillDataDto);

    // ✅ Fetch updated speciality with category populated
    const updatedSkill = await this._adminSkillRepository.findOne(
      { _id: id },
      { populate: { path: 'specialities', select: '_id name' } },
    );

    if (!updatedSkill) {
      throw new AppError('Skill not found after update', HttpStatus.NOT_FOUND);
    }

    const result = mapSkillModelToSkillDto(updatedSkill);

    return result;
  }
}
