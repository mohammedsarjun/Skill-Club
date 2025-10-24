import { Types } from 'mongoose';
import { IUser } from '../../models/interfaces/IUserModel.js';
import BaseRepository from '../baseRepositories/baseRepository.js';
export interface IUserRepository extends BaseRepository<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  updateResetPassword(
    userId: string | Types.ObjectId,
    token: string,
    expiry: Date,
  ): Promise<IUser | null>;
  updatePassword(userId: string | Types.ObjectId, hashedPassword: string): Promise<IUser | null>;
  findByResetToken(token: string): Promise<IUser | null>;
  addRoleAndCompleteOnboarding(
    userId: string | Types.ObjectId,
    role: string,
  ): Promise<IUser | null>;
  getUsers(
    filters?: {
      name?: string;
      roles?: 'client' | 'freelancer' | undefined;
    },
    options?: {
      skip?: number;
      limit?: number;
      populate?: {
        path: string;
        select: string;
      };
    },
  ): Promise<IUser[] | null>;
  updateClientStatus(userId: string, isBlocked: boolean): Promise<IUser | null>;
  updateFreelancerStatus(userId: string, isBlocked: boolean): Promise<IUser | null>;
  createFreelancerProfile(userId: string, freelancerData: Partial<IUser>): Promise<IUser | null>;
}
//# sourceMappingURL=IUserRepository.d.ts.map
