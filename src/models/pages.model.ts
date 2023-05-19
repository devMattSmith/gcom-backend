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
    dt_added: {
      type: Date,
      default: new Date(),
    },
    dt_upd: {
      type: Date,
    },
  },
  { versionKey: false }
);

export const PagesModel = model<Pages & Document>(
  "Pages",
  PagesSchema,
  "Pages"
);
