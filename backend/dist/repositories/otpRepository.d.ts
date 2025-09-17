import { IOtp } from "../models/interfaces/IOtpModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
import type { IOtpRepository } from "./interfaces/IOtpRepository.js";
export declare class OtpRepository extends BaseRepository<IOtp> implements IOtpRepository {
    constructor();
    findByEmail(email: string): Promise<IOtp | null>;
    deleteByEmail(email: string): Promise<IOtp | null>;
}
//# sourceMappingURL=otpRepository.d.ts.map