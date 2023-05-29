import { Router } from "express";
import { PagesController } from "@controllers/pages.controller";
import { CreatePagesDto } from "@dtos/pages.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";
export class PagesRoute implements Routes {
  public path = "/api/v1/pages";
  public router = Router();
  public pages = new PagesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.pages.getPages);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.pages.getPageById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreatePagesDto, true),
      AuthMiddleware,
      this.pages.createPage
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreatePagesDto, true),
      AuthMiddleware,
      this.pages.updatePage
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.pages.deletePage
    );
  }
}
