import { User } from '../models/userModel.js';
import BaseRepository from './baseRepositories/baseRepository.js';
export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  // Find user by email
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
  async findById(id) {
    return await super.findById(id);
  }
  async updateResetPassword(userId, token, expiry) {
    return await this.model.findByIdAndUpdate(
      userId,
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: expiry,
        },
      },
      { new: true },
    );
  }
  async updatePassword(userId, hashedPassword) {
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
  async findByResetToken(token) {
    return await this.model.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });
  }
  async addRoleAndCompleteOnboarding(userId, role) {
    const update = {
      $addToSet: { roles: role },
      $set: { activeRole: role, isOnboardingCompleted: true },
    };
    return await this.model.findByIdAndUpdate(userId, update, { new: true });
  }
  async getUsers(filters, options) {
    const query = {};
    if (typeof filters?.name === 'string' && filters.name.trim() !== '') {
      query.firstName = { $regex: filters.name.trim(), $options: 'i' };
    }
    if (typeof filters?.role === 'string' && filters.role.trim() !== '') {
      query.roles = { $in: [filters.role.trim()] };
    }
    let q = this.model.find(query).skip(options.skip).limit(options.limit);
    if (options.populate?.path) {
      q = q.populate(options.populate.path, options.populate.select ?? '');
    }
    return await q.exec();
  }
  async updateClientStatus(userId, isBlocked) {
    return super.update(userId, { isClientBlocked: isBlocked });
  }
  async updateFreelancerStatus(userId, isBlocked) {
    return super.update(userId, { isFreelancerBlocked: isBlocked });
  }
  async createFreelancerProfile(userId, freelancerData) {
    return super.update(userId, freelancerData);
  }
}
//# sourceMappingURL=UserRepository.js.map
