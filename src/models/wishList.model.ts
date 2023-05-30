import { model, Schema, Document } from "mongoose";
import { WishList } from "@interfaces/wishList.interfaces";
const ObjectId = Schema.Types.ObjectId;
const WishListSchema: Schema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    categoryId: {
      type: ObjectId,
      ref: "Category",
    },
    courseId: [
      {
        type: ObjectId,
        ref: "Courses",
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const WishListModel = model<WishList & Document>(
  "WishList",
  WishListSchema,
  "WishList"
);
