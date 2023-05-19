import { Router } from "express";
import { PagesController } from "@controllers/pages.controller";
import { CreatePagesDto } from "@dtos/pages.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class PagesRoute implements Routes {
  public path = "/v1/pages";
  public router = Router();
  public pages = new PagesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.pages.getPages);
    this.router.get(`${this.path}/:id`, this.pages.getPageById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreatePagesDto, true),
      this.pages.createPage
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreatePagesDto, true, true),
      this.pages.updatePage
    );
    this.router.delete(`${this.path}/:id`, this.pages.deletePage);
  }
}
