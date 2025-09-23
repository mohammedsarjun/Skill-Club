import { User } from "../models/userModel.js";
import BaseRepository from "./baseRepositories/baseRepository.js";
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
        }, { new: true } // return the updated document if needed
        );
    }
    async updatePassword(userId, hashedPassword) {
        return await User.findByIdAndUpdate(userId, {
            $set: {
                password: hashedPassword,
            },
            $unset: {
                resetPasswordToken: "",
                resetPasswordExpires: "",
            },
        }, { new: true });
    }
    async findByResetToken(token) {
        // MongoDB-specific logic stays here
        console.log(token, "repo");
        return await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }, // token not expired
        });
    }
    async addRoleAndCompleteOnboarding(userId, role) {
        const update = {
            $addToSet: { roles: role }, // add role if not exists
            $set: { activeRole: role, isOnboardingCompleted: true }
        };
        if (role === "freelancer") {
            update.$set.isFreelancerBoardingCompleted = true;
        }
        return await User.findByIdAndUpdate(userId, update, { new: true });
    }
}
//# sourceMappingURL=UserRepository.js.map