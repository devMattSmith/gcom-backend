import { model, Schema, Document } from "mongoose";
import { CourseViewHistory } from "@interfaces/courseViewHistory.interfaces";
const ObjectId = Schema.Types.ObjectId;
const CourseViewHistorySchema: Schema = new Schema(
  {
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

export const CourseViewHistoryModel = model<CourseViewHistory & Document>(
  "CourseViewHistory",
  CourseViewHistorySchema,
  "CourseViewHistory"
);
