import { model, Schema, Document } from "mongoose";
import { Course } from "@interfaces/course.interfaces";

const CourseSchema: Schema = new Schema(
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

export const CourseModel = model<Course & Document>(
  "Courses",
  CourseSchema,
  "Courses"
);
