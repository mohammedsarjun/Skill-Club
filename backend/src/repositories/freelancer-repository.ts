import { User } from '../models/user.model';
import { IExperience, IUser } from '../models/interfaces/i-user.model';
import BaseRepository from './baseRepositories/base-repository';
import { IFreelancerRepository } from './interfaces/i-freelancer-repository';
import { IEducationDTO, UpdateLanguageDTO } from '../dto/freelancer.dto';
import { Types } from 'mongoose';

export class FreelancerRepository extends BaseRepository<IUser> implements IFreelancerRepository {
  constructor() {
    super(User);
  }

  async getFreelancerById(userId: string): Promise<
    | (Omit<
        IUser,
        | 'freelancerProfile.workCategory'
        | 'freelancerProfile.specialties'
        | 'freelancerProfile.skills'
      > & {
        freelancerProfile: {
          workCategory: { _id: string; name: string };
          specialties: { _id: string; name: string }[];
          skills: { _id: string; name: string }[];
        };
      })
    | null
  > {
    const freelancer = await this.findOne(
      { _id: userId, roles: 'freelancer' },
      {
        populate: [
          { path: 'freelancerProfile.workCategory', select: '_id name' },
          { path: 'freelancerProfile.specialties', select: '_id name' },
          { path: 'freelancerProfile.skills', select: '_id name' },
        ],
      },
    );

    return freelancer as
      | (Omit<
          IUser,
          | 'freelancerProfile.workCategory'
          | 'freelancerProfile.specialties'
          | 'freelancerProfile.skills'
        > & {
          freelancerProfile: {
            workCategory: { _id: string; name: string };
            specialties: { _id: string; name: string }[];
            skills: { _id: string; name: string }[];
          };
        })
      | null;
  }

  async addLanguageToFreelancerProfile(
    userId: string,
    language: UpdateLanguageDTO,
  ): Promise<IUser | null> {
    return this.updateById(userId, { $push: { 'freelancerProfile.languages': language } });
  }

  async deleteLanguageFromFreelancerProfile(
    userId: string,
    language: string,
  ): Promise<IUser | null> {
    return this.updateById(userId, {
      $pull: { 'freelancerProfile.languages': { name: language } },
    });
  }

  async updateFreelancerProfile(
    userId: string,
    data: Record<string, unknown>,
  ): Promise<IUser | null> {
    return this.updateById(userId, data);
  }

  async addEducationToFreelancerProfile(
    userId: string,
    education: IEducationDTO,
  ): Promise<IUser | null> {
    return super.updateById(userId, {
      $push: { 'freelancerProfile.education': education },
    });
  }

  async deleteEducationFromFreelancerProfile(
    userId: string,
    educationId: string,
  ): Promise<IUser | null> {
    return super.updateById(userId, {
      $pull: { 'freelancerProfile.education': { _id: new Types.ObjectId(educationId) } },
    });
  }

  async addWorkExperienceToFreelancerProfile(
    userId: string,
    workHistory: IExperience,
  ): Promise<IUser | null> {
    return super.updateById(userId, {
      $push: { 'freelancerProfile.experiences': workHistory },
    });
  }

  async deleteWorkExperienceFromFreelancerProfile(
    userId: string,
    workHistoryId: string,
  ): Promise<IUser | null> {
    return super.updateById(userId, {
      $pull: { 'freelancerProfile.experiences': { _id: new Types.ObjectId(workHistoryId) } },
    });
  }
}
