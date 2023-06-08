import { Comment } from "@interfaces/comment.interfaces";
import { Document, Schema, model } from "mongoose";
const ObjectId = Schema.Types.ObjectId;
// why schema Model Not created
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
