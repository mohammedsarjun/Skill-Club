import { SpecialityDtoMinimal } from "../../../dto/speciality.dto.js";
export interface IUserSpecialityServices {
    getSpecialities(categoryId: string): Promise<SpecialityDtoMinimal[] | null>;
}
//# sourceMappingURL=IUserSpecialityServices.d.ts.map