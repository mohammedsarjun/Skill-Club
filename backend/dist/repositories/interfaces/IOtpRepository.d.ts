import { IOtp } from '../../models/interfaces/IOtpModel.js';
import BaseRepository from '../baseRepositories/baseRepository.js';
export interface IOtpRepository extends BaseRepository<IOtp> {
  findByEmail(email: string): Promise<IOtp | null>;
  deleteByEmail(email: string): Promise<IOtp | null>;
}
//# sourceMappingURL=IOtpRepository.d.ts.map
