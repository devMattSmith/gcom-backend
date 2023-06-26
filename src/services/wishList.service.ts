import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { WishList } from "@interfaces/wishList.interfaces";
import { UserModel } from "@models/users.model";
import { Types } from "mongoose";
@Service()
export class WishListService {
  public async findAllCategory(userId: string): Promise<WishList[]> {
    const wishlist: WishList[] = await UserModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "Courses",
          localField: "wishlist",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Category",
          localField: "course.category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          "course.categoryName": "$category.name",
        },
      },

      {
        $group: {
          _id: "$_id",
          courses: { $push: "$course" },
        },
      },
    ]);
    return wishlist;
  }

  public async updateuserWishList(wishListData: WishList): Promise<WishList> {
    // FIX: why the we have seperate WhishListSchema if we keep all the wishList inside the UserCollection
    const updateCommentById: WishList = await UserModel.findByIdAndUpdate(
      wishListData.userId,
      { $push: { wishlist: { $each: wishListData.courseId } } },
      { new: true }
    );
    if (!updateCommentById) throw new HttpException(409, "user doesn't exist");
    return updateCommentById;
  }
  public async removeCourse(courseData: WishList): Promise<WishList> {
    const createWishListData: WishList = await UserModel.findByIdAndUpdate(
      { _id: courseData.userId },
      {
        $pull: { wishlist: courseData.courseId },
      },
      { new: true }
    );
    return createWishListData;
  }
}
