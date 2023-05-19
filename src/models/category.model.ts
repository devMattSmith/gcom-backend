import { model, Schema, Document } from "mongoose";
import { Category } from "@interfaces/category.interfaces";

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    image: {
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

export const CategoryModel = model<Category & Document>(
  "Category",
  CategorySchema,
  "Category"
);
