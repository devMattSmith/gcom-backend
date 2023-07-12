import { MyListModel } from "@/models/myList.model";
import { PurchaseHistoryModel } from "@/models/purchaseHistory.model";
import { PurchaseHistory } from "@interfaces/purchaseHistory.interfaces";
import { Service } from "typedi";

@Service()
export class PurchaseHistorys {
  public async findAllPurchaseHistroy(): Promise<PurchaseHistory[]> {
    const category: PurchaseHistory[] = await PurchaseHistoryModel.find();
    return category;
  }

  public async getPurchaseHistoryByuserId(userId: string): Promise<PurchaseHistory[]> {
    const category: PurchaseHistory[] = await PurchaseHistoryModel.find({
      userId,
    });
    return category;
  }

  public async getAggregate(aggregation) {
    return await PurchaseHistoryModel.aggregate(aggregation);
  }

  public async totalPurchasedCourse(filter: any) {
    return await PurchaseHistoryModel.find(filter);
  }

  public async findAllRecentPurchaseCourse(startDate, endDate): Promise<PurchaseHistory[]> {
    const conditions = {};
    const and_clauses = [{}];

    if (startDate && startDate != '' && endDate && endDate != '') {
      and_clauses.push({
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(`${endDate}T23:59:59.999Z`),
        },
      });
    }
    conditions['$and'] = and_clauses;
    const category: PurchaseHistory[] = await PurchaseHistoryModel.aggregate([
      {
        $match: conditions,
      },
      {
        $lookup: {
          from: 'Courses',
          localField: 'courseId',
          foreignField: '_id',
          pipeline: [{ $match: { isDeleted: false } }],
          as: 'course',
        },
      },
      {
        $unwind: { path: '$course', preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$_id',
          userName: { $first: '$user.name' },
          courseName: { $first: '$course.course_name' },
          totalPrice: { $first: '$totalPrice' },
          orderId: { $first: '$orderId' },
        },
      },
      { $limit: 5 },
    ]);
    return category;
  }

  public async createPurchaseHistroy(categoryData: any, subscription = true): Promise<PurchaseHistory> {
    console.info(categoryData);
    const createCategoryData: PurchaseHistory = await PurchaseHistoryModel.create({
      ...categoryData,
    });
    // await CourseModel.findByIdAndUpdate(
    //   { _id: categoryData.courseId },
    //   {
    //     $inc: { purchaseCount: 1 },
    //   },
    //   { new: true }
    // );

    if (subscription) {
      const updateMyListById = await MyListModel.findByIdAndUpdate(
        { _id: categoryData.mylistId },
        { $push: { courseId: { $each: [categoryData.courseId] } } },
        { new: true },
      );
    }

    return createCategoryData;
  }
}
