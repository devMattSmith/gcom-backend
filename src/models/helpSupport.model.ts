import { model, Schema, Document } from "mongoose";
import { HelpSupport } from "@interfaces/helpSupport.interfaces";
import { PRIORITY, STATUS } from "../utils/constant";
const ObjectId = Schema.Types.ObjectId;
const HelpSupportSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    orderId: {
      type: String,
    },
    labels: [
      {
        type: String,
      },
    ],
    clientName: {
      type: String,
    },
    assignTo: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    dueDate: {
      type: Date,
    },
    priority: {
      type: Number,
      enum: PRIORITY,
      default: 1,
    },
    status: {
      type: Number,
      enum: STATUS,
      default: 1,
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

export const HelpSupportModel = model<HelpSupport & Document>(
  "HelpSupport",
  HelpSupportSchema,
  "HelpSupport"
);
