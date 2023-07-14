import { notificationStatus, notificationType } from '@/enum/enum';
import { INotification } from '@/interfaces/notification.interface';
import { Document, Schema, model } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;
const NotificationSchema: Schema = new Schema({
  notificationTitle: {
    type: String
  },
  notificationType: {
    type: String,
    enum: notificationType,
  },
  status: {
    type: String,
    enum: notificationStatus,
  },
  description: {
    type: String,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  courseId: {
    type: ObjectId,
    ref: 'Course',
  },
}, { timestamps: true, versionKey: false });

export const NotificationModel = model<INotification & Document>('notifications', NotificationSchema, 'notifications');
