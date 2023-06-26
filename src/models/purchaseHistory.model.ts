import { model, Schema, Document } from "mongoose";
import { PurchaseHistory } from "@interfaces/purchaseHistory.interfaces";
const ObjectId = Schema.Types.ObjectId;
const PurchaseHostorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    payamentType: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    courseId: {
      type: ObjectId,
      ref: "Course",
    },
    orderId: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const PurchaseHistoryModel = model<PurchaseHistory & Document>(
  "PurchaseHistory",
  PurchaseHostorySchema,
  "PurchaseHistory"
);
