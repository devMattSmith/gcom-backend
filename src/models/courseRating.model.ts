import { model, Schema, Document } from "mongoose";
import { CourseRating } from "@interfaces/courseRating.interfaces";
const ObjectId = Schema.Types.ObjectId;
const CourseRatingSchema: Schema = new Schema(
  {
    rate: {
      type: Number,
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
  },
  { timestamps: true, versionKey: false }
);

export const CourseRatingModel = model<CourseRating & Document>(
  "CourseRating",
  CourseRatingSchema,
  "CourseRating"
);
