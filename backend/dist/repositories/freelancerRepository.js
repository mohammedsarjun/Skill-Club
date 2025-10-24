import { User } from '../models/userModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
export class FreelancerRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  async getFreelancerById(userId) {
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
  async addLanguageToFreelancerProfile(userId, language) {
    return this.update(userId, { $push: { 'freelancerProfile.languages': language } });
  }
  async deleteLanguageFromFreelancerProfile(userId, language) {
    return this.update(userId, { $pull: { 'freelancerProfile.languages': { name: language } } });
  }
  async updateFreelancerProfile(userId, data) {
    return this.update(userId, data);
  }
}
//# sourceMappingURL=freelancerRepository.js.map
