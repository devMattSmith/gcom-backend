import { model, Schema, Document } from "mongoose";
import { HelpSupport } from "@interfaces/helpSupport.interfaces";

// FIX: Remove the dt_added and upd and use timestampseries
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
    }
  },
  { timestamps: true,versionKey: false }
);

export const HelpSupportModel = model<HelpSupport & Document>(
  "HelpSupport",
  HelpSupportSchema,
  "HelpSupport"
);
