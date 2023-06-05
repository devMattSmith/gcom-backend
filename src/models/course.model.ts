import { Course } from '@interfaces/course.interfaces';
import { Document, Schema, SchemaTypes, model } from 'mongoose';

const CourseSchema: Schema = new Schema(
  {
    course_name: {
      type: String,
      required: true,
    },
    category_id: {
      type: String,
    },
    watch_sample: {
      type: String,
      default: null,
    },
    course_description: {
      type: Schema.Types.Mixed,
      default: null,
    },
    uploader: {
      type: String,
      default: null,
    },
    videos: {
      type: Schema.Types.Mixed,
      default: null,
    },
    sampleVideo: {
      type: String,
    },
    trailerVideo: {
      type: String,
    },
    price: {
      type: String,
    },
    viewCount: {
      type: String,
    },
    tunmbnailImg: {
      type: String,
    },
    language_id: {
      type: String,
    },
    country_id: {
      type: String,
    },
    discount_percent: {
      type: String,
    },
    is_disable: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Schema.Types.Mixed,
      default: null,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
    tags: {
      type: Schema.Types.Mixed,
      default: null,
    },
    generalInfo: {
      type: Schema.Types.Mixed,
    },
    meta: {
      type: Schema.Types.Mixed,
      default: null,
    },
    module: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'courseModule',
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const CourseModel = model<Course & Document>('Course', CourseSchema, 'Courses');
