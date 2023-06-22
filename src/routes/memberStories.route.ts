import { Router } from "express";
import { MemberStoriesController } from "@controllers/memberStories.controller";
import { MemberStoriesDto } from "@dtos/memberStories.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";

export class MemberStories implements Routes {
  public path = "/api/v1/memberStories";
  public router = Router();
  public memberStory = new MemberStoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      // AuthMiddleware,
      this.memberStory.getStories
    );

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(MemberStoriesDto, true),
      // AuthMiddleware,
      this.memberStory.createStory
    );
  }
}
