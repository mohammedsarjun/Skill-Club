import { CreateGoogleUserDTO } from '../../dto/authDTO/googleAuth.dto.js';
import { IUser } from '../../models/interfaces/IUserModel.js';
export declare const mapCreateGoogleUserDtoToUserModel: (
  dto: CreateGoogleUserDTO,
) => Pick<IUser, 'firstName' | 'lastName' | 'email' | 'avatar' | 'googleId'>;
//# sourceMappingURL=googleAuth.mapper.d.ts.map
