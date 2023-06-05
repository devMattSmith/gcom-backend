import { CourseModule } from '@/interfaces/course.interfaces';
import { Document, Schema, SchemaTypes, model } from 'mongoose';

const ModuleSchema: Schema = new Schema(
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
    chapter: {
      type: SchemaTypes.ObjectId,
      ref: 'chapter',
    },
  },
  { timestamps: true, versionKey: false },
);

export const CourseModuleModel = model<CourseModule & Document>('courseModule', ModuleSchema);
