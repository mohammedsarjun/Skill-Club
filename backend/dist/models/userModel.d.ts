import mongoose from 'mongoose';
import { IUser } from './interfaces/IUserModel.js';
export declare const User: mongoose.Model<
  IUser,
  {},
  {},
  {},
  mongoose.Document<unknown, {}, IUser, {}, {}> &
    IUser &
    Required<{
      _id: mongoose.Types.ObjectId;
    }> & {
      __v: number;
    },
  any
>;
//# sourceMappingURL=userModel.d.ts.map
