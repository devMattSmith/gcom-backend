import { model, Schema, Document } from "mongoose";
import { Subscriptions } from "@interfaces/subscriptions.interfaces";
import { PLAN_TYPE } from "../utils/constant";
const SubscriptionsSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    planType: {
      type: Number,
      enum: PLAN_TYPE,
      default: 1,
    },
    amount: {
      type: Number,
    },
    planId: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const SubscriptionsModel = model<Subscriptions & Document>(
  "Subscriptions",
  SubscriptionsSchema,
  "Subscriptions"
);
