import { User } from '../models/userModel.js';
import { IFreelancerProfile, IUser } from '../models/interfaces/IUserModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
import { IFreelancerRepository } from './interfaces/IFreelancerRepository.js';
import { UpdateQuery } from 'mongoose';
import { UpdateLanguageDTO } from '../dto/freelancer.dto.js';
import { populate } from 'dotenv';

export class FreelancerRepository extends BaseRepository<IUser> implements IFreelancerRepository {
  constructor() {
    super(User);
  }

  async getFreelancerById(userId: string) {
    return this.findOne(
      { _id: userId, roles: 'freelancer' },
      {
        populate: {
          path: 'freelancerProfile.skills',
          select: '_id name',
        },
      },
    );
  }

  async addLanguageToFreelancerProfile(
    userId: string,
    language: UpdateLanguageDTO,
  ): Promise<IUser | null> {
    return this.update(userId, { $push: { 'freelancerProfile.languages': language } });
  }

  async deleteLanguageFromFreelancerProfile(
    userId: string,
    language: string,
  ): Promise<IUser | null> {
    return this.update(userId, { $pull: { 'freelancerProfile.languages': { name: language } } });
  }

  async updateFreelancerProfile(userId: string, data: Record<string, any>): Promise<IUser | null> {
    return this.update(userId, data);
  }
}
