import { Router } from "express";
import { LearningToolsController } from "@controllers/learningTools.controller";
import { LearningToolsDto } from "@dtos/learningTools.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";

export class LearningToolsRoute implements Routes {
  public path = "/api/v1/learingToolsEvents";
  public router = Router();
  public learningTools = new LearningToolsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      // AuthMiddleware,
      this.learningTools.getEvents
    );

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(LearningToolsDto, true),
      // AuthMiddleware,
      this.learningTools.createEvent
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(LearningToolsDto, true),
      //AuthMiddleware,
      this.learningTools.updateEvent
    );
    this.router.delete(
      `${this.path}/:id`,
      //  AuthMiddleware,
      this.learningTools.deleteEvent
    );
  }
}
