import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Reviews } from "@interfaces/reviews.interfaces";
import { ReviewsModel } from "@models/reviews.model";

@Service()
export class ReviewsService {
  public async findAllReviews(skip: number, limit: number): Promise<Reviews[]> {
    const reviews: Reviews[] = await ReviewsModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ dt_added: -1 })
      .lean()
      .exec();

    return reviews;
  }

  public async countAllReviews(): Promise<number> {
    const reviews: number = await ReviewsModel.count();
    return reviews;
  }

  public async findReviewById(reviewId: string): Promise<Reviews> {
    const findReviews: Reviews = await ReviewsModel.findOne({ _id: reviewId });
    if (!findReviews) throw new HttpException(409, "review doesn't exist");

    return findReviews;
  }

  public async createReview(reviewData: Reviews): Promise<Reviews> {
    const createReviewData: Reviews = await ReviewsModel.create({
      ...reviewData,
    });

    return createReviewData;
  }

  public async updateReview(
    reviewId: string,
    reviewData: Reviews
  ): Promise<Reviews> {
    const updateReviewById: Reviews = await ReviewsModel.findByIdAndUpdate(
      reviewId,
      {
        reviewData,
      },
      { new: true }
    );
    if (!updateReviewById) throw new HttpException(409, "Review doesn't exist");

    return updateReviewById;
  }

  public async deleteReview(reviewId: string): Promise<Reviews> {
    const deleteReviewById: Reviews = await ReviewsModel.findByIdAndDelete(
      reviewId
    );
    if (!deleteReviewById) throw new HttpException(409, "Review doesn't exist");

    return deleteReviewById;
  }
}
