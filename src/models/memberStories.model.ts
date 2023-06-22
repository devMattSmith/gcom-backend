import { model, Schema, Document } from "mongoose";
import { MemberStories } from "@interfaces/memberStories.interfaces";

const MemberStoriesSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const MemberStoriesModel = model<MemberStories & Document>(
  "MemberStories",
  MemberStoriesSchema,
  "MemberStories"
);
