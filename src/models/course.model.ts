import { Course } from "@interfaces/course.interfaces";
import { Document, Schema, SchemaTypes, model } from "mongoose";
import { CORUSE_STATUS, COUSE_PURCHASE_TYPE } from "../utils/constant";
const ObjectId = Schema.Types.ObjectId;
// const ChapterSchema: Schema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   banner: {
//     url: { type: String },
//     key: { type: String },
//   },
//   description: {
//     type: Schema.Types.Mixed,
//   },
//   video: {
//     url: { type: String },
//     key: { type: String },
//   },
// });

// const ModuleSchema: Schema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     courseId: {
//       type: ObjectId,
//       ref: "Courses",
//     },

//     chapter: [ChapterSchema],
//   },
//   { timestamps: true, versionKey: false }
// );
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
    thumbnail: {
      type: String,
      default: null,
    },
    bannerImage: {
      type: String,
      default: null,
    },
    previewVideo: {
      url: {
        type: String,
        default: null,
      },
      key: {
        type: String,
        default: null,
      },
      jobId: {
        type: String,
        default: null,
      },
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
    purchaseCount: {
      type: Number,
    },
    viewCount: {
      type: Number,
    },
    ratedCount: {
      type: Number,
    },
    purchaseType: { type: Number, enum: COUSE_PURCHASE_TYPE },
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
