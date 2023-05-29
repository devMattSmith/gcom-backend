import { Router } from "express";
import { CreateCommentDto } from "@dtos/comment.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { CommentController } from "@/controllers/comment.controller";
import { isAdmin } from "@middlewares/auth.middleware";
export class CommentRoute implements Routes {
  public path = "/api/v1/comment";
  public router = Router();
  public comments = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.comments.getComments);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateCommentDto, true),
      this.comments.createComment
    );
    this.router.put(
      `${this.path}/:id/addReply`,
      ValidationMiddleware(CreateCommentDto, true),
      this.comments.updateComment
    );
  }
}
