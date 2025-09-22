import { CreateSpecialityDTO, UpdateSpecialityDTO } from "../../../dto/adminDTO/speciality.dto.js";
import { GetSpecialityDto } from "../../../dto/adminDTO/speciality.dto.js";
import { PaginatedSpecialityDto } from "../../../dto/adminDTO/speciality.dto.js";
export interface IAdminSpecialityServices {
    addSpeciality(specialityData: CreateSpecialityDTO): Promise<any>;
    getSpeciality(filterData: GetSpecialityDto): Promise<PaginatedSpecialityDto>;
    editSpeciality(specialityData: UpdateSpecialityDTO): Promise<any>;
}
//# sourceMappingURL=IAdminSpecialityServices.d.ts.map