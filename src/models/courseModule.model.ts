import { CourseModule } from "@/interfaces/course.interfaces";
import { Document, Schema, SchemaTypes, model } from "mongoose";
const ObjectId = Schema.Types.ObjectId;
const ChapterSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  banner: {
    url: { type: String },
    key: { type: String },
    jobId: {
      type: String,
    },
  },
  description: {
    type: Schema.Types.Mixed,
  },
  video: {
    url: { type: String },
    key: { type: String },
    jobId: {
      type: String,
    },
  },
  duration: { type: Number },
});

const ModuleSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    courseId: {
      type: ObjectId,
      ref: "Courses",
    },

    chapter: [ChapterSchema],
  },
  { timestamps: true, versionKey: false }
);

export const CourseModuleModel = model<CourseModule & Document>(
  "courseModule",
  ModuleSchema
);
