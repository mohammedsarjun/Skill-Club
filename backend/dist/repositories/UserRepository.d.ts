import { IUser } from '../models/interfaces/IUserModel.js';
import { Document, Types } from 'mongoose';
import BaseRepository from './baseRepositories/baseRepository.js';
import { IUserRepository } from './interfaces/IUserRepository.js';
export declare class UserRepository extends BaseRepository<IUser> implements IUserRepository {
    constructor();
    findByEmail(email: string): Promise<IUser | null>;
    updateResetPassword(userId: string | Types.ObjectId, token: string, expiry: Date): Promise<IUser | null>;
    updatePassword(userId: string | Types.ObjectId, hashedPassword: string): Promise<IUser | null>;
    findByResetToken(token: string): Promise<(Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    addRoleAndCompleteOnboarding(userId: string | Types.ObjectId, role: string): Promise<(Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getUsers(filters: {
        name?: string;
        role?: 'client' | 'freelancer' | undefined;
    }, options: {
        skip: number;
        limit: number;
        populate?: {
            path: string;
            select: string;
        };
    }): Promise<IUser[] | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map