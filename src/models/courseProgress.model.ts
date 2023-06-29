import { model, Schema, Document } from 'mongoose';
import { ChapterProgress } from '@interfaces/courseProgress.interfaces';
const ObjectId = Schema.Types.ObjectId;
const moduleProgressSchema: Schema = new Schema({
  moduleId: {
    type: ObjectId,
    ref: 'courseModule',
  },
  chapter_progress: [
    {
      chapter_id: { type: String },
      completed: {
        type: Number,
        default: 0,
      },
    },
  ],
});
const CourseProgressSchema: Schema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    courseId: {
      type: ObjectId,
      ref: 'Courses',
    },
    module_progress: [moduleProgressSchema],

    is_completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false },
);

export const CourseProgressModel = model<ChapterProgress & Document>('CourseProgress', CourseProgressSchema, 'CourseProgress');
