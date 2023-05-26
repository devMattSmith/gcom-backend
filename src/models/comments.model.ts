import { model, Schema, Document } from "mongoose";
import { Comment } from "@interfaces/comment.interfaces";
const ObjectId = Schema.Types.ObjectId;
const replySchema: Schema = new Schema({
  reply: {
    type: String,
  },
  userId: {
    type: ObjectId,
    ref: "User",
  },
});
const CommentSchema: Schema = new Schema(
  {
    comment: {
      type: String,
    },
    userId: {
      type: ObjectId,
      ref: "User",
    },
    ticketId: {
      type: ObjectId,
      ref: "Ticket",
    },
    replies: [replySchema],
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const CommentModel = model<Comment & Document>(
  "Comment",
  CommentSchema,
  "Comments"
);
