import { CreateSpecialityDTO, GetSpecialityDto, PaginatedSpecialityDto, UpdateSpecialityDTO } from '../../dto/adminDTO/speciality.dto.js';
import { IAdminSpecialityServices } from './interfaces/IAdminSpecialityServices.js';
import type { IAdminSpecialityRepository } from '../../repositories/adminRepositoies/interfaces/IAdminSpecialityRepository.js';
export declare class AdminSpecialityServices implements IAdminSpecialityServices {
    private adminSpecialityRepository;
    constructor(adminSpecialityRepository: IAdminSpecialityRepository);
    addSpeciality(specialityData: CreateSpecialityDTO): Promise<any>;
    getSpeciality(filterData: GetSpecialityDto): Promise<PaginatedSpecialityDto>;
    editSpeciality(specialityData: UpdateSpecialityDTO): Promise<any>;
}
//# sourceMappingURL=adminSpecialityServices.d.ts.map