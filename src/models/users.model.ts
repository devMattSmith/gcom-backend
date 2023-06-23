import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface";
import { USER_ROLES } from "../utils/constant";
const ObjectId = Schema.Types.ObjectId;
const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // verification: {
    //   token: {
    //     type: String,
    //     default: "",
    //   },
    //   expireTime: {
    //     type: Date,
    //     default: null,
    //   },
    //   isVerified: {
    //     type: Boolean,
    //     default: false,
    //   },
    // },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
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
    about: {
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
    subscriptions: [
      {
        type: ObjectId,
        ref: "Subscriptions",
      },
    ],
    courses: [
      {
        type: ObjectId,
        ref: "Courses",
      },
    ],
    viwedCourses: [
      {
        type: ObjectId,
        ref: "Courses",
      },
    ],
    categories: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],
    role: {
      type: Number,
      enum: USER_ROLES,
      default: 1,
    },
    wishlist: [
      {
        type: ObjectId,
        ref: "Courses",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model<User & Document>("User", UserSchema, "Users");
