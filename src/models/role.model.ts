import { model, Schema, Document } from "mongoose";
import { IRoles } from "@interfaces/role.interfaces";

const PermissionSchema = new Schema({
  module: {
    type: String,
    required: true,
  },
  create: {
    type: Boolean,
    default: false,
  },
  edit: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Boolean,
    default: false,
  },
});

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    type: {
      type: Number,
      required: true,
    },
    permissions: {
      type: [PermissionSchema],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const RoleModel = model<IRoles & Document>("Role", RoleSchema, "Role");
