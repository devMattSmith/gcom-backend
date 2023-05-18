import { model, Schema, Document } from "mongoose";
import { User } from "@interfaces/users.interface";

const ObjectId = Schema.Types.ObjectId;
const UserSchema: Schema = new Schema({}, { versionKey: false });

export const UserModel = model<User & Document>("User", UserSchema);
