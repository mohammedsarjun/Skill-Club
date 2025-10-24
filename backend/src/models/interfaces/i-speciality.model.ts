import { Document } from 'mongoose';
import { Types } from 'mongoose';
export interface ISpeciality extends Document {
  _id: string;
  name: string;
  category: Types.ObjectId;
  status: string;
}
