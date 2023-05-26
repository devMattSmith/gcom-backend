import { model, Schema, Document } from "mongoose";
import { Course } from "@interfaces/course.interfaces";

const CourseSchema: Schema = new Schema(
  {
    course_name: {
      type: String,
      required: true,
    },
    category_id:{
      type: String
    },
    watch_sample:{
      type: String,
      default:null
    },
    course_description:{
      type: String,
      default:null
    },
    uploader:{
      type: String,
      default:null
    },
    videos:{
      type: String,
      default:null
    },
    sampleVideo:{
      type: String
    },
    trailerVideo:{
      type: String
    },
    price:{
      type: String
    },
    viewCount:{
      type: String
    },
    tunmbnailImg:{
      type: String
    },
    language_id:{
      type: String
    },
    country_id:{
      type: String
    },
    discount_percent:{
      type: String
    },
    is_disable:{
      type: String
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const CourseModel = model<Course & Document>(
  "Course",
  CourseSchema,
  "Courses"
);