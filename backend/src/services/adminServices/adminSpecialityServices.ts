import { injectable, inject } from "tsyringe";
import AppError from "../../utils/AppError.js";
import { HttpStatus } from "../../enums/http-status.enum.js";
import {
  CreateSpecialityDTO,
  GetSpecialityDto,
  PaginatedSpecialityDto,
  SpecialityDto,
} from "../../dto/adminDTO/speciality.dto.js";
import { IAdminSpecialityServices } from "./interfaces/IAdminSpecialityServices.js";
import type { IAdminSpecialityRepository } from "../../repositories/adminRepositoies/interfaces/IAdminSpecialityRepository.js";
import { mapSpecialityModelToSpecialityDto } from "../../mapper/adminMapper/speciality.mapper.js";
import { ISpeciality } from "../../models/interfaces/ISpecialityModel.js";
@injectable()
export class AdminSpecialityServices implements IAdminSpecialityServices {
  private adminSpecialityRepository;

  constructor(
    @inject("IAdminSpecialityRepository")
    adminSpecialityRepository: IAdminSpecialityRepository
  ) {
    this.adminSpecialityRepository = adminSpecialityRepository;
  }

  async addSpeciality(specialityData: CreateSpecialityDTO): Promise<any> {
    const existing = await this.adminSpecialityRepository.findOne({
      name: specialityData.name,
    });

    if (existing) {
      throw new AppError(
        "Speciality with this name already exists",
        HttpStatus.CONFLICT
      );
    }

    const result = await this.adminSpecialityRepository.create(specialityData);

    return {
      id: result._id,
      name: result.name,
      category: result.category,
      status: result.status,
    };
  }

  //   editSpeciality(data): Promise<any> {

  //   }

  async getSpeciality(
    filterData: GetSpecialityDto
  ): Promise<PaginatedSpecialityDto> {
    const page = filterData.page ?? 1;
    const limit = filterData.limit ?? 10;
    const skip = (page - 1) * limit;
    const mode = filterData.mode;

    const result = await this.adminSpecialityRepository.findAll(
      { name: { $regex: filterData.search || "", $options: "i" } },
      { skip, limit, populate: { path: "category", select: "name" } }
    );

    const total = await this.adminSpecialityRepository.count({
      name: filterData.search || "",
    });

    // Map to DTO


    let data: SpecialityDto[] = result.map(mapSpecialityModelToSpecialityDto);

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
