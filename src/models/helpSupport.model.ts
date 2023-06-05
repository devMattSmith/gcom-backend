import { model, Schema, Document } from "mongoose";
import { HelpSupport } from "@interfaces/helpSupport.interfaces";
const HelpSupportSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    clientName: {
      type: String,
    },
    assigntTo: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      default: "",
    },
    status: {
      type: String,
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
