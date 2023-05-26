import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Comment } from "@interfaces/comment.interfaces";
import { CommentModel } from "@models/comments.model";
import moment from "moment";

@Service()
export class CommentService {
  public async findAllComments(): Promise<Comment[]> {
    const comments: Comment[] = await CommentModel.aggregate([
      {
        $unwind: { path: "$replies", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Ticket",
          localField: "ticketId",
          foreignField: "_id",
          pipeline: [{ $project: { title: 1 } }],
          as: "ticket",
        },
      },
      {
        $unwind: { path: "$ticket", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Users",
          localField: "replies.userId",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "subusers",
        },
      },
      {
        $unwind: { path: "$subusers", preserveNullAndEmptyArrays: true },
      },

      { $addFields: { "replies.username": "$subusers.name" } },
      {
        $group: {
          _id: "$_id",
          replies: { $push: "$replies" },
          ticketTitle: { $first: "$ticket.title" },
          comment: { $first: "$comment" },
          user: { $first: "$user.name" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ]);
    return comments;
  }

  public async createComment(commentData: Comment): Promise<Comment> {
    const createCommentData: Comment = await CommentModel.create({
      ...commentData,
    });
    return createCommentData;
  }
  public async updateComment(
    commentId: string,
    commentData: Comment
  ): Promise<Comment> {
    const updateCommentById: Comment = await CommentModel.findByIdAndUpdate(
      commentId,
      { $push: { replies: { $each: commentData } } },
      { new: true }
    );
    if (!updateCommentById)
      throw new HttpException(409, "comment doesn't exist");
    return updateCommentById;
  }
}
