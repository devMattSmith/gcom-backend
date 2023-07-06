import { Router } from "express";
import { CreateReviewDto } from "@dtos/reviews.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { ReviewsController } from "@/controllers/reviews.controller";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";
export class ReviewRoute implements Routes {
  public path = "/api/v1/reviews";
  public router = Router();
  public reviews = new ReviewsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.reviews.getReviews);
    // this.router.get(
    //   `${this.path}/:id`,
    //   AuthMiddleware,
    //   this.reviews.getReviewById
    // );
    // this.router.get(
    //   `${this.path}/:id`,
    //   AuthMiddleware,
    //   this.reviews.getReviewById
    // );
    this.router.get(
      `${this.path}/:id`,
      // AuthMiddleware,
      this.reviews.getReviewByUserId
    );
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateReviewDto, true),
      // AuthMiddleware,
      this.reviews.createReview
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateReviewDto, true),
      AuthMiddleware,
      this.reviews.updateReview
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.reviews.deleteReview
    );
  }
}
