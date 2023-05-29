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
  },
  { timestamps: true, versionKey: false }
);

export const CountryModel = model<Country & Document>(
  "Country",
  CountrySchema,
  "Country"
);
