import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Reviews } from "@interfaces/reviews.interfaces";
import { ReviewsModel } from "@models/reviews.model";
import { Types } from "mongoose";
@Service()
export class ReviewsService {
  public async findAllReviews(skip: number, limit: number): Promise<Reviews[]> {
    const reviews: Reviews[] = await ReviewsModel.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Course",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          comment: 1,
          rating: 1,
          status: 1,
          username: "$user.name",
          coursename: "$course.name",
          description: 1,
          reviewDate: "$createdAt",
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);
    return reviews;
  }
  public async countAllUser(): Promise<number> {
    const reviews: number = await ReviewsModel.count();
    return reviews;
  }
  public async findReviewById(reviewId: string): Promise<Reviews> {
    const findReviews: Reviews = await ReviewsModel.findOne({ _id: reviewId });
    if (!findReviews) throw new HttpException(409, "review doesn't exist");
    return findReviews;
  }
  public async findReviewByUserId(userId: string): Promise<any> {
    const findReviews: Reviews[] = await ReviewsModel.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },

      {
        $lookup: {
          from: "Courses",
          localField: "courseId",
          foreignField: "_id",
          pipeline: [{ $match: { isDeleted: false } }],
          as: "course",
        },
      },
      {
        $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
      },
      {
        $match: { "user._id": new Types.ObjectId(userId) },
      },

      {
        $group: {
          _id: "$_id",
          comment: { $first: "$comment" },
          rating: { $first: "$rating" },
          status: { $first: "$status" },
          username: { $first: "$user.name" },
          coursename: { $first: "$course.course_name" },
          courseDescription: { $first: "$course.course_description" },
          courseThumbnail: { $first: "$course.thumbnail" },
          description: { $first: "$description" },
          reviewDate: { $first: "$createdAt" },
        },
      },
    ]);
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
        ...reviewData,
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
