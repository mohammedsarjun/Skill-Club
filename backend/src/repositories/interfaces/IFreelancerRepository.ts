import BaseRepository from '../baseRepositories/baseRepository.js';
import { IFreelancerProfile, IUser } from '../../models/interfaces/IUserModel.js';
import { UpdateLanguageDTO } from '../../dto/freelancer.dto.js';
export interface IFreelancerRepository extends BaseRepository<IUser> {
  getFreelancerById(userId: string): Promise<IUser | null>;
  addLanguageToFreelancerProfile(userId: string, language: UpdateLanguageDTO): Promise<IUser | null>;
}
