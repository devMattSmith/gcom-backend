import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { Reviews } from "@interfaces/reviews.interfaces";
import { ReviewsService } from "@services/reviews.service";
import { DATATABLE } from "@config";
export class ReviewsController {
  public reviews = Container.get(ReviewsService);

  public getReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { skip, limit, search } = req.body;

      skip = skip ? Number(skip) : DATATABLE.skip;
      limit = limit ? Number(limit) : DATATABLE.limit;

      const count = await this.reviews.countAllReviews();
      const findAllReviewsData: Reviews[] = await this.reviews.findAllReviews(
        skip,
        limit
      );

      res
        .status(200)
        .json({ data: findAllReviewsData, count, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getReviewById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageId: string = req.params.id;
      const findOneReviewData: Reviews = await this.reviews.findReviewById(
        pageId
      );

      res.status(200).json({ data: findOneReviewData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageData: Reviews = req.body;

      const createReviewData: Reviews = await this.reviews.createReview(
        pageData
      );

      res.status(201).json({ data: createReviewData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviewId: string = req.params.id;
      const reviewData: Reviews = req.body;
      const updateReviewData: Reviews = await this.reviews.updateReview(
        reviewId,
        reviewData
      );

      res.status(200).json({ data: updateReviewData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviewId: string = req.params.id;
      const deleteReviewData: Reviews = await this.reviews.deleteReview(
        reviewId
      );

      res.status(200).json({ data: deleteReviewData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
