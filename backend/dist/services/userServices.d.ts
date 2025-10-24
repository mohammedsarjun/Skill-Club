import { IUserServices } from './interfaces/IUserServices.js';
import type { IUserRepository } from '../repositories/interfaces/IUserRepository.js';
export declare class userServices implements IUserServices {
  private userRepository;
  constructor(userRepository: IUserRepository);
  markUserVerified(id: string): Promise<void>;
}
//# sourceMappingURL=userServices.d.ts.map
