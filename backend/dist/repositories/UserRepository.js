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
        return await User.findByIdAndUpdate(userId, {
            $set: {
                resetPasswordToken: token,
                resetPasswordExpires: expiry,
            },
        }, { new: true });
    }
    async updatePassword(userId, hashedPassword) {
        return await User.findByIdAndUpdate(userId, {
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
        console.log(token, 'repo');
        return await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }, // token not expired
        });
    }
    async addRoleAndCompleteOnboarding(userId, role) {
        const update = {
            $addToSet: { roles: role }, // add role if not exists
            $set: { activeRole: role, isOnboardingCompleted: true },
        };
        if (role === 'freelancer') {
            update.$set.isFreelancerBoardingCompleted = true;
        }
        return await User.findByIdAndUpdate(userId, update, { new: true });
    }
    async getUsers(filters, options) {
        const query = {};
        if (filters?.name) {
            query.firstName = { $regex: filters.name, $options: "i" };
        }
        else {
            query.firstName = "";
        }
        if (filters?.roles) {
            query.roles = { $in: filters.roles };
        }
        // Start the query
        return await User.find({ firstName: { $regex: `${filters.name}`, $options: 'i' } })
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
//# sourceMappingURL=UserRepository.js.map