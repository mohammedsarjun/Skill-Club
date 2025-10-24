import { IUser } from '../models/interfaces/IUserModel.js';
import { Types } from 'mongoose';
import BaseRepository from './baseRepositories/baseRepository.js';
import { IUserRepository } from './interfaces/IUserRepository.js';
export declare class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor();
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  updateResetPassword(
    userId: string | Types.ObjectId,
    token: string,
    expiry: Date,
  ): Promise<IUser | null>;
  updatePassword(userId: string | Types.ObjectId, hashedPassword: string): Promise<IUser | null>;
  findByResetToken(token: string): Promise<
    | (import('mongoose').Document<unknown, {}, IUser, {}, {}> &
        IUser &
        Required<{
          _id: Types.ObjectId;
        }> & {
          __v: number;
        })
    | null
  >;
  addRoleAndCompleteOnboarding(
    userId: string | Types.ObjectId,
    role: string,
  ): Promise<
    | (import('mongoose').Document<unknown, {}, IUser, {}, {}> &
        IUser &
        Required<{
          _id: Types.ObjectId;
        }> & {
          __v: number;
        })
    | null
  >;
  getUsers(
    filters: {
      name?: string;
      role?: 'client' | 'freelancer';
    },
    options: {
      skip: number;
      limit: number;
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
//# sourceMappingURL=UserRepository.d.ts.map
