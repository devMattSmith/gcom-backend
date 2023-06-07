import { model, Schema, Document } from "mongoose";
import { Category } from "@interfaces/category.interfaces";

const CourseRatingSchema: Schema = new Schema(
  {
    rate: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const CourseRatingModel = model<Category & Document>(
  "CourseRating",
  CourseRatingSchema,
  "CourseRating"
);
