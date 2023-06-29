
import { Document, Schema, model } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

export interface ILoginActivity {
  user?: string;
  device_id?: string;
  device_name?: string;
  city?: string;
  type?: string;
  country?: string;
}

const LoginActivitySchema: Schema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    device_id: {
      type: String,
      default: null,
    },
    device_name: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    type: {
      type: String
    }
  },
  { timestamps: true, versionKey: false },
);

export const LoginActiviyModel = model<ILoginActivity & Document>('loginActivity', LoginActivitySchema);
