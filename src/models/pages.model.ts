import { model, Schema, Document } from "mongoose";
import { Pages } from "@interfaces/pages.interfaces";

const PagesSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const PagesModel = model<Pages & Document>(
  "Pages",
  PagesSchema,
  "Pages"
);
