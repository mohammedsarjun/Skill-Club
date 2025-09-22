import { Request, Response } from "express";
import type { IAdminSpecialityController } from "./interfaces/IAdminSpecialityController.js";
import { injectable, inject } from "tsyringe";
import type { IAdminSpecialityServices } from "../../services/adminServices/interfaces/IAdminSpecialityServices.js";
import { mapCreateSpecialityDtoToSpecialityModel, mapSpecialityQuery, mapUpdateSpecialityDtoToSpecialityModel } from "../../mapper/adminMapper/speciality.mapper.js";
import "../../config/container.js";

import { HttpStatus } from "../../enums/http-status.enum.js";

@injectable()
export class AdminSpecialityController implements IAdminSpecialityController {
  private adminSpecialityService: IAdminSpecialityServices;

  constructor(
    @inject("IAdminSpecialityServices")
    adminSpecialityService: IAdminSpecialityServices
  ) {
    this.adminSpecialityService = adminSpecialityService;
  }
  async addSpeciality(req: Request, res: Response): Promise<void> {
    try {
      const dto = mapCreateSpecialityDtoToSpecialityModel(req.body);
      const result = await this.adminSpecialityService.addSpeciality(dto);
      res.status(HttpStatus.CREATED).json({
        success: true,
        message: "Speciality created successfully",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  async editSpeciality(req: Request, res: Response): Promise<void> {
    try {

      const result = await this.adminSpecialityService.editSpeciality(req.body);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Speciality Updated successfully",
        data: result,
      });
    } catch (error) {
      throw error;
    }
    return Promise.resolve();
  }

  async getAllSpeciality(req: Request, res: Response): Promise<void> {
    try {
      const dto = mapSpecialityQuery(req.query);
      const result = await this.adminSpecialityService.getSpeciality(dto);
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Speciality Fetched successfully",
        data: result,
      });
    } catch (error) {
      throw error;
    }
    return Promise.resolve();
  }
}
