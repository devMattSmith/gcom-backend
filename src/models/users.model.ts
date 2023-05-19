import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface";

const ObjectId = Schema.Types.ObjectId;
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    verification: {
      token: {
        type: String,
        default: "",
      },
      expireTime: {
        type: Date,
        default: null,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    registerType: {
      type: String,
    },
    country: {
      type: ObjectId,
      ref: "Country",
    },
    isDesable: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: Number,
    },
    zipcode: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
    intrest: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    registrationDate: {
      type: String,
    },
    // role: {
    //   type: ObjectId,
    //   ref: "Role",
    // },
    dt_added: {
      type: Date,
      default: new Date(),
    },
    dt_upd: {
      type: Date,
    },
  },
  { versionKey: false }
);

export const UserModel = model<User & Document>("User", UserSchema, "Users");
