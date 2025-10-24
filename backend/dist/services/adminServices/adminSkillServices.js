var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import {
  mapCreateSkillDtoToSkillModel,
  mapSkillModelToSkillDto,
  mapSkillQuery,
  mapUpdateSkillDtoToSkillModel,
} from '../../mapper/adminMapper/skill.mapper.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';
let AdminSkillServices = class AdminSkillServices {
  constructor(adminSkillRepository) {
    this._adminSkillRepository = adminSkillRepository;
  }
  async addSkill(skillData) {
    const skillDataDto = mapCreateSkillDtoToSkillModel(skillData);
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
  async getSkills(filterData) {
    const filterDataDto = mapSkillQuery(filterData);
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
    const data = result.map(mapSkillModelToSkillDto);
    return {
      data,
      total,
      page,
      limit,
    };
  }
  async editSkill(id, skilldata) {
    // Check for duplicate name
    const skillDataDto = mapUpdateSkillDtoToSkillModel(skilldata);
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
};
AdminSkillServices = __decorate(
  [
    injectable(),
    __param(0, inject('IAdminSkillRepository')),
    __metadata('design:paramtypes', [Object]),
  ],
  AdminSkillServices,
);
export { AdminSkillServices };
//# sourceMappingURL=adminSkillServices.js.map
