import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { PurchaseHistory } from "@interfaces/purchaseHistory.interfaces";
import { CategoryModel } from "@models/category.model";
import { PurchaseHistoryModel } from "@/models/purchaseHistory.model";
import { CourseModel } from "@/models/course.model";

@Service()
export class PurchaseHistorys {
  public async findAllPurchaseHistroy(): Promise<PurchaseHistory[]> {
    const category: PurchaseHistory[] = await PurchaseHistoryModel.find();
    return category;
  }
  public async findAllRecentPurchaseCourse(): Promise<PurchaseHistory[]> {
    const category: PurchaseHistory[] = await PurchaseHistoryModel.aggregate([
      {
        $lookup: {
          from: "Courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
      },
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
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$_id",
          userName: { $first: "$user.name" },
          courseName: { $first: "$course.course_name" },
          totalPrice: { $first: "$totalPrice" },
          orderId: { $first: "$orderId" },
        },
      },
      { $limit: 5 },
    ]);
    return category;
  }

  public async createPurchaseHistroy(
    categoryData: PurchaseHistory
  ): Promise<PurchaseHistory> {
    const createCategoryData: PurchaseHistory =
      await PurchaseHistoryModel.create({
        ...categoryData,
      });
    await CourseModel.findByIdAndUpdate(
      { _id: categoryData.courseId },
      {
        $inc: { purchaseCount: 1 },
      },
      { new: true }
    );
    return createCategoryData;
  }
}
