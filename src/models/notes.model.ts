import { model, Schema, Document } from "mongoose";
import { Notes } from "@interfaces/notes.interfaces";
const ObjectId = Schema.Types.ObjectId;
const NotesSchema: Schema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    courseId: {
      type: ObjectId,
      ref: "Course",
    },
    moduleId: {
      type: ObjectId,
      ref: "coursemodule",
    },
    chapterId: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },

    duringTime: {
      type: String,
      // required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const NotesModel = model<Notes & Document>(
  "Notes",
  NotesSchema,
  "Notes"
);
4;
