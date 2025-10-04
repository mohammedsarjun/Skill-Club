import { User } from '../models/userModel.js';
import { IUser } from '../models/interfaces/IUserModel.js';
import { Model, Document, FilterQuery, UpdateQuery, Types, PopulateOptions } from 'mongoose';
import BaseRepository from './baseRepositories/baseRepository.js';
import { IUserRepository } from './interfaces/IUserRepository.js';

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }

  // Find user by email
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findOne({ email });
  }

  async findById(id: string): Promise<IUser | null> {
    return await super.findById(id)
  }

  async updateResetPassword(
    userId: string | Types.ObjectId,
    token: string,
    expiry: Date,
  ): Promise<IUser | null> {
    return await this.model.findByIdAndUpdate(
      userId,
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: expiry,
        },
      },
      { new: true }, // return the updated document if needed
    );
  }

  async updatePassword(
    userId: string | Types.ObjectId,
    hashedPassword: string,
  ): Promise<IUser | null> {
    return await this.model.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedPassword,
        },
        $unset: {
          resetPasswordToken: '',
          resetPasswordExpires: '',
        },
      },
      { new: true },
    );
  }

  async findByResetToken(token: string) {
    // MongoDB-specific logic stays here

    return await this.model.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // token not expired
    });
  }

  async addRoleAndCompleteOnboarding(userId: string | Types.ObjectId, role: string) {
    const update: any = {
      $addToSet: { roles: role }, // add role if not exists
      $set: { activeRole: role, isOnboardingCompleted: true },
    };

    return await this.model.findByIdAndUpdate(userId, update, { new: true });
  }

async getUsers(
  filters: { name?: string; role?: 'client' | 'freelancer' },
  options: {
    skip: number;
    limit: number;
    populate?: { path: string; select: string };
  },
): Promise<IUser[] | null> {
  const query: Record<string, any> = {};

  // Name filter (case-insensitive regex), only if provided and non-empty
  if (typeof filters?.name === 'string' && filters.name.trim() !== '') {
    query.firstName = { $regex: filters.name.trim(), $options: 'i' };
  }

  // Role filter (roles is an array in the model), only if provided and non-empty
  if (typeof filters?.role === 'string' && filters.role.trim() !== '') {
    query.roles = { $in: [filters.role.trim()] };
  }

  // Build the query and execute with .exec()
  let q = this.model.find(query).skip(options.skip).limit(options.limit);

  if (options.populate?.path) {
    q = q.populate(options.populate.path, options.populate.select ?? '');
  }

  return await q.exec();
}

async updateClientStatus(userId:string,isBlocked:boolean): Promise<IUser | null>{
  return super.update(userId,{isClientBlocked:isBlocked})
}

async updateFreelancerStatus(userId:string,isBlocked:boolean):Promise<IUser | null>{
  return super.update(userId,{isFreelancerBlocked:isBlocked})
}
}