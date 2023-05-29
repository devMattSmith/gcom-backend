import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { Comment } from "@interfaces/comment.interfaces";
import { CommentService } from "@services/comment.service";
import { DATATABLE } from "@config";
export class CommentController {
  public comments = Container.get(CommentService);

  public getComments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllTicketsData: Comment[] =
        await this.comments.findAllComments();

      res.status(200).json({ data: findAllTicketsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const commentData: Comment = req.body;

      const createHelpSupportData: Comment = await this.comments.createComment(
        commentData
      );

      res.status(201).json({ data: createHelpSupportData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviewId: string = req.params.id;
      const reviewData: Comment = req.body.data;
      const updateHelpSupportData: Comment = await this.comments.updateComment(
        reviewId,
        reviewData
      );

      res.status(200).json({ data: updateHelpSupportData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };
}
