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

  async updateResetPassword(
    userId: string | Types.ObjectId,
    token: string,
    expiry: Date,
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
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
    return await User.findByIdAndUpdate(
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

    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // token not expired
    });
  }

  async addRoleAndCompleteOnboarding(userId: string | Types.ObjectId, role: string) {
    const update: any = {
      $addToSet: { roles: role }, // add role if not exists
      $set: { activeRole: role, isOnboardingCompleted: true },
    };

    return await User.findByIdAndUpdate(userId, update, { new: true });
  }

  async getUsers(
    filters: { name?: string; role?: 'client' | 'freelancer' | undefined },
    options: {
      skip: number;
      limit: number;
      populate?: {
        path: string;
        select: string; // only get id and name
      };
    },
  ): Promise<IUser[] | null> {
    const query: any = {};

    if (filters?.name && filters.name.trim() !== '') {
      query.firstName = { $regex: filters.name, $options: 'i' };
    }

    if (filters?.role) {
      query.roles = filters.role;
    }

    console.log(query);

    // Start the query

    return await User.find(query)
      .skip(options.skip || 0)
      .limit(options.limit || 10);

    // let mongoQuery = User.find({ firstName: { $regex: `${query.firstName}`, $options: 'i' } });

    // // Apply pagination
    // if (options?.skip !== undefined) mongoQuery = mongoQuery.skip(options.skip);
    // if (options?.limit !== undefined) mongoQuery = mongoQuery.limit(options.limit);

    // // Apply population
    // if (options?.populate) {
    //   mongoQuery = mongoQuery.populate({ path: "category", select: "_id name" });
    // }

    // return await mongoQuery.exec();
  }


}
