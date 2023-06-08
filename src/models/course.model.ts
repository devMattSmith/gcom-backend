import { Course } from "@interfaces/course.interfaces";
import { Document, Schema, model } from "mongoose";
import { CORUSE_STATUS } from "../utils/constant";
const ObjectId = Schema.Types.ObjectId;

// FIX : Missing Instrutor of the Course
// Duration WIll be Virtual Fields, it will be sum of all the chapter Duration
// Course Doesnot have the Module Constrain 

const CourseSchema: Schema = new Schema(
  {
    course_name: {
      type: String,
      required: true,
    },
    category_id: {
      type: ObjectId,
      ref: "Category",
    },
    duration: {
      type: String,
      default: null,
    },
    course_description: {
      type: String,
      default: null,
    },
    courseBanner: {
      type: String,
      default: null,
    },
    previewVideo: {
      type: String,
      default: null,
    },
    generalInfo: {
      instructorName: {
        type: ObjectId,
        ref: "User",
      },
      price: {
        type: Number,
        default: null,
      },
      discount: {
        type: Number,
        default: null,
      },
    },
    meta: {
      title: {
        type: String,
        default: null,
      },
      keywoards: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        default: null,
      },
    },
    status: { type: Number, enum: CORUSE_STATUS, default: 1 },
    tags: {
      type: Schema.Types.Mixed,
      default: null,
    },
    learningToolsText: {
      type: String,
    },
    learningToolsDoc: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const CourseModel = model<Course & Document>(
  "Course",
  CourseSchema,
  "Courses"
);
