import { model, Schema, Document } from "mongoose";
import { MyList } from "@interfaces/myList.interfaces";
const ObjectId = Schema.Types.ObjectId;
const MyListSchema: Schema = new Schema(
  {
    name: String,
    userId: {
      type: ObjectId,
      ref: "User",
    },
    courseId: [
      {
        type: ObjectId,
        ref: "Courses",
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const MyListModel = model<MyList & Document>(
  "MyList",
  MyListSchema,
  "MyList"
);
