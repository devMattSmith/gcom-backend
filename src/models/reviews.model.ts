import { model, Schema, Document } from "mongoose";
import { Reviews } from "@interfaces/reviews.interfaces";
const ObjectId = Schema.Types.ObjectId;
const ReviewsSchema: Schema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    courseId: {
      type: ObjectId,
      ref: "Course",
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
    },
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

export const ReviewsModel = model<Reviews & Document>(
  "Reviews",
  ReviewsSchema,
  "Reviews"
);
