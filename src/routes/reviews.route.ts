import { Router } from "express";
import { CreateReviewDto } from "@dtos/reviews.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { ReviewsController } from "@/controllers/reviews.controller";

export class ReviewRoute implements Routes {
  public path = "/v1/reviews";
  public router = Router();
  public reviews = new ReviewsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.reviews.getReviews);
    this.router.get(`${this.path}/:id`, this.reviews.getReviewById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateReviewDto, true),
      this.reviews.createReview
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateReviewDto, true, true),
      this.reviews.updateReview
    );
    this.router.delete(`${this.path}/:id`, this.reviews.deleteReview);
  }
}
