import { CreateSpecialityDTO, UpdateSpecialityDTO} from "../../../dto/speciality.dto.js"
import { GetSpecialityDto } from "../../../dto/speciality.dto.js"
import { PaginatedSpecialityDto } from "../../../dto/speciality.dto.js"
export interface IAdminSpecialityServices{
    addSpeciality(specialityData:CreateSpecialityDTO):Promise<any>
    getSpeciality(filterData:GetSpecialityDto):Promise<PaginatedSpecialityDto>
    editSpeciality(specialityData:UpdateSpecialityDTO):Promise<any>
    // getSpeciality(filterData:any):Promise<any>
    // editSpeciality(data:any,id:string):Promise<any>
}