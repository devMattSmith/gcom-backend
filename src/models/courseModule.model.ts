import { Chapter, CourseModule } from "@/interfaces/course.interfaces";
import { Document, Schema, model } from "mongoose";
const ObjectId = Schema.Types.ObjectId;
const ChapterSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
  },
  description: {
    type: Schema.Types.Mixed,
  },
  video: {
    type: String,
  },
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

export const ChapterModel = model<Chapter & Document>("chapter",ChapterSchema) 