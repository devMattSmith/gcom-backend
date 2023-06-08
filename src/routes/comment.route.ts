import { CommentController } from "@/controllers/comment.controller";
import { CreateCommentDto } from "@dtos/comment.dto";
import { Routes } from "@interfaces/routes.interface";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { Router } from "express";
export class CommentRoute implements Routes {
  public path = "/api/v1/comment";
  public router = Router();
  public comments = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // FIX: Get Comment Need POST Method
    this.router.post(`${this.path}`, AuthMiddleware, this.comments.getComments);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateCommentDto, true),
      AuthMiddleware,
      this.comments.createComment
    );
    this.router.put(
      `${this.path}/:id/addReply`,
      ValidationMiddleware(CreateCommentDto, true),
      AuthMiddleware,
      this.comments.updateComment
    );
  }
}
