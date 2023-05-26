import { model, Schema, Document } from "mongoose";
import { Category } from "@interfaces/category.interfaces";

const SubscriptionsSchema: Schema = new Schema(
  {
    name: {
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
  },
  { timestamps: true, versionKey: false }
);

export const CategoryModel = model<Category & Document>(
  "Subscriptions",
  SubscriptionsSchema,
  "Subscriptions"
);
