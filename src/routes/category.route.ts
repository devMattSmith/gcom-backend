import { Router } from "express";
import { CategoryController } from "@controllers/category.controller";
import { CreateCategoryDto } from "@dtos/category.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";

export class CategoryRoute implements Routes {
  public path = "/api/v1/category";
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      this.category.getCategories
    );
    this.router.get(
      `${this.path}/:id`,
      AuthMiddleware,
      this.category.getCategoryById
    );
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateCategoryDto, true),
      AuthMiddleware,
      this.category.createCategory
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateCategoryDto, true),
      AuthMiddleware,
      this.category.updateCategory
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.category.deleteCategory
    );
  }
}
