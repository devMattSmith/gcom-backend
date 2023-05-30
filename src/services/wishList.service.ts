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
      // {
      //   $lookup: {
      //     from: "Users",
      //     localField: "userId",
      //     foreignField: "_id",
      //     pipeline: [{ $project: { name: 1 } }],
      //     as: "user",
      //   },
      // },
      // {
      //   $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      // },
      // {
      //   $lookup: {
      //     from: "Category",
      //     localField: "categoryId",
      //     foreignField: "_id",
      //     pipeline: [{ $project: { name: 1 } }],
      //     as: "category",
      //   },
      // },
      // {
      //   $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
      // },
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
        $group: {
          _id: "$_id",
          courses: { $push: "$course" },
        },
      },
    ]);
    return wishlist;
  }

  public async updateuserWishList(wishListData: WishList): Promise<WishList> {
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
