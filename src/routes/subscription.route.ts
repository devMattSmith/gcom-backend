import { SubscriptionController } from "@controllers/subscription.controller";
import { CreateSubscriptionDto } from "@dtos/subscription.dto";
import { Routes } from "@interfaces/routes.interface";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { Router } from "express";

export class SubscriptionRoute implements Routes {
  public path = "/api/v1/subscription";
  public router = Router();
  public subscription = new SubscriptionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      AuthMiddleware,
      this.subscription.getCategories
    );
    // this.router.get(
    //   `${this.path}/:id`,
    //   AuthMiddleware,
    //   this.category.getCategoryById
    // );
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateSubscriptionDto, true),
      AuthMiddleware,
      this.subscription.createSubscription
    );
    // this.router.put(
    //   `${this.path}/:id`,
    //   ValidationMiddleware(CreateCategoryDto, true),
    //   AuthMiddleware,
    //   this.category.updateCategory
    // );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.subscription.deleteSubscription
    );
  }
}
