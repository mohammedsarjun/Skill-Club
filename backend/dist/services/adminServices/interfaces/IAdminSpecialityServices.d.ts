import { CreateSpecialityDTO } from "../../../dto/adminDTO/speciality.dto.js";
import { GetSpecialityDto } from "../../../dto/adminDTO/speciality.dto.js";
import { PaginatedSpecialityDto } from "../../../dto/adminDTO/speciality.dto.js";
export interface IAdminSpecialityServices {
    addSpeciality(specialityData: CreateSpecialityDTO): Promise<any>;
    getSpeciality(filterData: GetSpecialityDto): Promise<PaginatedSpecialityDto>;
}
//# sourceMappingURL=IAdminSpecialityServices.d.ts.map