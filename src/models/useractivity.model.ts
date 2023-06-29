import { Document, Schema, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export interface IUserActivitySchema {
  type?: string;
  user?: string;
  course?: string;
}

const UserActivitySchema: Schema = new Schema(
  {
    type: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    course: {
      type: ObjectId,
      ref: 'Course',
    },
  },
  { timestamps: true, versionKey: false },
);

export const UserActivityModel = model<IUserActivitySchema & Document>('userActivity', UserActivitySchema);
UserActivitySchema.index({ type: 1, user: 1, course: 1, createdAt: 1 }, { unique: true });
