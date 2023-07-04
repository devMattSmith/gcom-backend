import { Router } from "express";
import { PaymentHistoryController } from "@controllers/purchaseHistory.controller";
import { CreateCategoryDto } from "@dtos/category.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";

export class PurchaseHistory implements Routes {
  public path = "/api/v1/purchaseHistory";
  public router = Router();
  public category = new PaymentHistoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      // AuthMiddleware,
      this.category.getPurchaseHistory
    );
    this.router.post(
      `${this.path}/getRecentPurchaseCourse`,
      // AuthMiddleware,
      this.category.getRecentPurchase
    ),
      this.router.post(
        `${this.path}/create`,
        // ValidationMiddleware(CreateCategoryDto, true),
        // AuthMiddleware,
        this.category.createPurchaseHistroy
      );
  }
}
