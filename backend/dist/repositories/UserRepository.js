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
    async updateResetPassword(userId, token, expiry) {
        return await this.model.findByIdAndUpdate(userId, {
            $set: {
                resetPasswordToken: token,
                resetPasswordExpires: expiry,
            },
        }, { new: true });
    }
    async updatePassword(userId, hashedPassword) {
        return await this.model.findByIdAndUpdate(userId, {
            $set: {
                password: hashedPassword,
            },
            $unset: {
                resetPasswordToken: '',
                resetPasswordExpires: '',
            },
        }, { new: true });
    }
    async findByResetToken(token) {
        // MongoDB-specific logic stays here
        return await this.model.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }, // token not expired
        });
    }
    async addRoleAndCompleteOnboarding(userId, role) {
        const update = {
            $addToSet: { roles: role }, // add role if not exists
            $set: { activeRole: role, isOnboardingCompleted: true },
        };
        return await this.model.findByIdAndUpdate(userId, update, { new: true });
    }
    async getUsers(filters, options) {
        const query = {};
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
}
//# sourceMappingURL=UserRepository.js.map