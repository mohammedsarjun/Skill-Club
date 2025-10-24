import { UserDto } from '../../../dto/userDTO/user.dto.js';
export interface IGoogleAuthService {
  verifyToken(idToken: string): Promise<UserDto>;
}
//# sourceMappingURL=IGoogleAuthService.d.ts.map
