import { model, Schema, Document } from "mongoose";
import { Category } from "@interfaces/category.interfaces";
import { PAYMENT_STATUS, SUBSCRIPTION_TYPE } from "../utils/constant";
const ObjectId = Schema.Types.ObjectId;
const PaymentHistorySchema: Schema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    courseId: {
      type: ObjectId,
      ref: "Course",
    },
    amount: {
      type: Number,
    },
    method: {
      type: Number,
    },
    type: {
      type: Number,
      enum: SUBSCRIPTION_TYPE,
      default: 1,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Number,
      enum: PAYMENT_STATUS,
      default: 1,
    },
  },
  { timestamps: true, versionKey: false }
);

export const PaymentHistoryModel = model<Category & Document>(
  "PaymentHistory",
  PaymentHistorySchema,
  "PaymentHistory"
);
