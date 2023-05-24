import { model, Schema, Document } from "mongoose";
import { RoleSchema } from "@interfaces/role.interfaces";

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

export const RoleModel = model<RoleSchema & Document>(
  "Role",
  RoleSchema,
  "Role"
);
