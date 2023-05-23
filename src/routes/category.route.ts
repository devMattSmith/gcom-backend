import { Router } from "express";
import { CategoryController } from "@controllers/category.controller";
import { CreateCategoryDto } from "@dtos/category.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class CategoryRoute implements Routes {
  public path = "/api/v1/category";
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.category.getCategories);
    this.router.get(`${this.path}/:id`, this.category.getCategoryById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateCategoryDto, true),
      this.category.createCategory
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateCategoryDto, true),
      this.category.updateCategory
    );
    this.router.delete(`${this.path}/:id`, this.category.deleteCategory);
  }
}
