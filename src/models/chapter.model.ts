import { Chapter } from '@/interfaces/course.interfaces';
import { Document, Schema, model } from 'mongoose';

// FIX: Chapter Schema already in CourseModule
const ChapterSchema: Schema = new Schema({
  name: {
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

export const ChapterModel = model<Chapter & Document>('chapter', ChapterSchema);
