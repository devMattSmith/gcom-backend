import { model, Schema, Document } from "mongoose";
import { Pages } from "@interfaces/pages.interfaces";
const ObjectId = Schema.Types.ObjectId;
const CommentSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    ticketId: {
      type: ObjectId,
      ref: "HelpSupport",
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
