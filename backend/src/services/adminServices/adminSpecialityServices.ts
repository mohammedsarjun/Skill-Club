import { injectable, inject } from 'tsyringe';
import AppError from '../../utils/AppError.js';
import { HttpStatus } from '../../enums/http-status.enum.js';
import {
  CreateSpecialityDTO,
  GetSpecialityDto,
  PaginatedSpecialityDto,
  SpecialityDto,
  UpdateSpecialityDTO,
} from '../../dto/speciality.dto.js';
import { IAdminSpecialityServices } from './interfaces/IAdminSpecialityServices.js';
import type { IAdminSpecialityRepository } from '../../repositories/adminRepositories/interfaces/IAdminSpecialityRepository.js';
import {
  mapCreateSpecialityDtoToSpecialityModel,
  mapSpecialityModelToSpecialityDto,
  mapUpdateSpecialityDtoToSpecialityModel,
} from '../../mapper/speciality.mapper.js';
import { ERROR_MESSAGES } from '../../contants/errorConstants.js';

@injectable()
export class AdminSpecialityServices implements IAdminSpecialityServices {
  private _adminSpecialityRepository;

  constructor(
    @inject('IAdminSpecialityRepository')
    adminSpecialityRepository: IAdminSpecialityRepository,
  ) {
    this._adminSpecialityRepository = adminSpecialityRepository;
  }

  async addSpeciality(specialityData: CreateSpecialityDTO): Promise<any> {
    const specialityDataDto= mapCreateSpecialityDtoToSpecialityModel(specialityData)
    const existing = await this._adminSpecialityRepository.findOne({
      name: specialityDataDto.name,
    });

    if (existing) {
      throw new AppError(ERROR_MESSAGES.SPECIALITY.ALREADY_EXIST, HttpStatus.CONFLICT);
    }

    // Create speciality
    const created = await this._adminSpecialityRepository.create(specialityDataDto);

    // Fetch with category populated
    const populated = await this._adminSpecialityRepository.findOne(
      { _id: created._id },
      { populate: { path: 'category', select: '_id name' } },
    );

    if (!populated) {
      throw new AppError('Speciality not found after creation', HttpStatus.NOT_FOUND);
    }
    const result = mapSpecialityModelToSpecialityDto(populated);
    return result;
  }

  async getSpeciality(filterData: GetSpecialityDto): Promise<PaginatedSpecialityDto> {
    const page = filterData.page ?? 1;
    const limit = filterData.limit ?? 10;
    const skip = (page - 1) * limit;
    const categoryFilter = filterData.categoryFilter;
    const mode = filterData.mode;
    console.log(categoryFilter);
    const result = await this._adminSpecialityRepository.findAllWithFilters(
      {
        search: filterData.search, // just values
        category: filterData.categoryFilter, // just values
      },
      {
        skip,
        limit,
        populate: {
          path: 'category',
          select: '_id name',
        },
      },
    );

    const total = await this._adminSpecialityRepository.count({
      name: filterData.search || '',
    });

    // Map to DTO

    const data: SpecialityDto[] = result!.map(mapSpecialityModelToSpecialityDto);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  // service
  async editSpeciality(specialityData: UpdateSpecialityDTO): Promise<any> {
    // Check for duplicate name
    if (specialityData?.name) {
      const existing = await this._adminSpecialityRepository.findOne({ name: specialityData.name });
      if (existing && existing._id.toString() !== specialityData.id) {
        throw new AppError(ERROR_MESSAGES.SPECIALITY.ALREADY_EXIST, HttpStatus.CONFLICT);
      }
    }

    // Map DTO to model and update
    const dto = mapUpdateSpecialityDtoToSpecialityModel(specialityData);
    await this._adminSpecialityRepository.update(specialityData.id, dto);

    // ✅ Fetch updated speciality with category populated
    const updatedSpeciality = await this._adminSpecialityRepository.findOne(
      { _id: specialityData.id },
      { populate: { path: 'category', select: '_id name' } },
    );

    if (!updatedSpeciality) {
      throw new AppError('Speciality not found after update', HttpStatus.NOT_FOUND);
    }

    const result = mapSpecialityModelToSpecialityDto(updatedSpeciality);

    return result;
  }

  
}
