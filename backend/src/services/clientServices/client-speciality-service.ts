/**
 * @file client-speciality-service.ts
 * @description Service responsible for handling the business logic related to client speciality operations.
 * It acts as a bridge between the ClientSpecialityController and the data repositories,
 * performing validation, transformation, and repository interactions as needed.
 *
 * @layer Service
 * @module Client
 * @category Speciality
 *
 * @dependencies
 * - tsyringe: For dependency injection.
 * - ISpecialityRepository: For database operations related to specialities.
 * - AppError & HttpStatus: For consistent error handling.
 *
 * @usage
 * This service is used by the ClientSpecialityController to perform all client-speciality-related
 * business operations, such as fetching specialities with their associated skills.
 *
 * Example usage in controller:
 * const result = await this._clientSpecialityService.getAllSpecialityWithSkills();
 *
 * @see IClientSpecialityController
 * @see IClientSpecialityService
 * @see ISpecialityRepository
 */

import { injectable, inject } from 'tsyringe';
import '../../config/container';
import { IClientSpecialityService } from './interfaces/client-speciality-service.interface';
import { GetClientSpecialityWithSkillsDTO } from '../../dto/clientDTO/client-speciality-dto';
import { mapSpecialityModelToGetClientSpecialityWithSkillsDTO } from '../../mapper/clientMapper/client-speciality-mapper';
import { ISpecialityWithSkill } from '../../models/interfaces/speciality.model.interface';
import { ISpecialityRepository } from 'src/repositories/interfaces/speciality-repository.interface';

@injectable()
export class ClientSpecialityService implements IClientSpecialityService {
  private _specialityRepository: ISpecialityRepository;
  constructor(@inject('ISpecialityRepository') specialityRepository: ISpecialityRepository) {
    this._specialityRepository = specialityRepository;
  }

  /**
   * @description Fetches all client speciality with skills and maps them to DTOs.
   * @returns {Promise<GetClientSpecialityWithSkillsDTO[]>} Returns an array of client speciality with skills DTOs.
   */

  async getSpecialityWithSkills(
    selectedCategory: string,
  ): Promise<GetClientSpecialityWithSkillsDTO[]> {
    const specialitiesWithSkills: ISpecialityWithSkill[] | null =
      await this._specialityRepository.getAllSpecialitiesWithSkills(selectedCategory);

    const specialityDtos = specialitiesWithSkills
      ? specialitiesWithSkills.map(mapSpecialityModelToGetClientSpecialityWithSkillsDTO)
      : [];

    return specialityDtos;
  }
}
