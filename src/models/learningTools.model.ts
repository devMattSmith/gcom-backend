import { model, Schema, Document } from "mongoose";
import { LearningTools } from "@interfaces/learningTools.interfaces";
import { LEARNING_TOOLD_PLATFORM } from "@/utils/constant";

const ObjectId = Schema.Types.ObjectId;
const LearningToolsSchema: Schema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    courseId: {
      type: ObjectId,
      ref: "Courses",
    },
    platForm: {
      type: Number,
      enum: LEARNING_TOOLD_PLATFORM,
      default: 1,
    },
    name: {
      type: String,
    },
    frequency: {
      type: String,
    },
    time: {
      type: String,
    },
    endTime: {
      type: String,
    },
    clientId: {
      type: String,
    },
    apiKey: {
      type: String,
    },
    scope: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    discoveryDocs: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const LearningToolsModel = model<LearningTools & Document>(
  "LearningTools",
  LearningToolsSchema,
  "LearningTools"
);
