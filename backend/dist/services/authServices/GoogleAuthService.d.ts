import { IGoogleAuthService } from './interfaces/IGoogleAuthService.js';
import type { IUserRepository } from '../../repositories/interfaces/IUserRepository.js';
import { UserDto } from '../../dto/userDTO/user.dto.js';
declare class GoogleAuthService implements IGoogleAuthService {
  private _userRepository;
  constructor(userRepository: IUserRepository);
  verifyToken(idToken: string): Promise<UserDto>;
}
export default GoogleAuthService;
//# sourceMappingURL=GoogleAuthService.d.ts.map
