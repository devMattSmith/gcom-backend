import { IUserSubscription } from '@/interfaces/usersubscription.interface';
import { Document, Schema, model } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;
const UserSubscriptionSchema: Schema = new Schema(
  {
    plan: {
      type: ObjectId,
      ref: 'Subscriptions',
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
    status: {
      type: Boolean,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    transactionRef: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true, versionKey: false },
);

export const UserSubscriptionModel = model<IUserSubscription & Document>('UserSubscriptions', UserSubscriptionSchema, 'UserSubscriptions');
