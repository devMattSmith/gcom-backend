import { model, Schema, Document } from "mongoose";
import { Country } from "@interfaces/country.interfaces";

const CountrySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
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

export const CountryModel = model<Country & Document>(
  "Country",
  CountrySchema,
  "Country"
);
