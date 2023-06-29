import { HttpException } from "@/exceptions/httpException";
import { Course, CourseModule } from "@/interfaces/course.interfaces";
import { PurchaseHistoryModel } from "@/models/purchaseHistory.model";
import { CourseModel } from "@/models/course.model";
import { CourseModuleModel } from "@/models/courseModule.model";
import { CourseViewHistoryModel } from "@/models/courseViewHistory.model";
import { CourseRatingModel } from "@/models/courseRating.model";
import { CourseRating } from "@/interfaces/courseRating.interfaces";
import { CourseViewHistory } from "@/interfaces/courseViewHistory.interfaces";
import { ChapterProgress } from "@/interfaces/courseProgress.interfaces";
import { CourseProgressModel } from "@/models/courseProgress.model";
import { Service } from "typedi";
import { Types } from "mongoose";
import { UserModel } from "@/models/users.model";
@Service()
export class CourseService {
  public async findAllCourses(
    skip: number,
    limit: number,
    status: number,
    search: string,
    category: any
  ): Promise<any[]> {
    var conditions = {};
    var and_clauses = [{}];
    if (status) {
      and_clauses.push({
        status: status,
      });
    }

    if (search && search != "") {
      and_clauses.push({
        $or: [
          {
            course_name: {
              $regex: "^" + search,
              $options: "i",
            },
          },
        ],
      });
    }

    if (category && category.length != 0) {
      const cateId = category.map((s) => new Types.ObjectId(s));
      and_clauses.push({
        category_id: { $in: cateId },
      });
    }

    conditions["$and"] = and_clauses;
    const course: any[] = await CourseModel.aggregate([
      {
        $match: conditions,
      },
      {
        $lookup: {
          from: "Users",
          localField: "generalInfo.instructorName",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Category",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          course_name: 1,
          author: "$user.name",
          duration: 1,
          category: "$category.name",
          price: "$generalInfo.price",
          published: "$createdAt",
          status: 1,
          rating: "5.5",
          bannerImage: 1,
          thumbnail: 1,
          subscriptions: "6",
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: "total" }],
        },
      },
      // { $skip: skip },
      // { $limit: limit },
    ]);

    if (!course) throw new HttpException(409, "course doesn't exist");
    return course;
    // return await CourseModel.find();
  }

  public async countAllCategory(): Promise<number> {
    return await CourseModel.count();
  }

  public async findCourseById(courseId: string): Promise<any> {
    const course: any[] = await CourseModel.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "generalInfo.instructorName",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Category",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "coursemodules",
          localField: "_id",
          foreignField: "courseId",
          as: "courseModule",
        },
      },
      {
        $unwind: { path: "$courseModule", preserveNullAndEmptyArrays: true },
      },
      {
        $match: { _id: new Types.ObjectId(courseId) },
      },
      {
        $addFields: {
          generalInfo: {
            instructorName: "$user.name",
            price: "$generalInfo.price",
            discount: "$generalInfo.discount",
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          modules: { $push: "$courseModule" },
          course_name: { $first: "$course_name" },
          category: { $first: "$category.name" },
          duration: { $first: "$duration" },
          course_description: { $first: "$course_description" },
          bannerImage: { $first: "$bannerImage" },
          thumbnail: { $first: "$thumbnail" },
          previewVideo: { $first: "$previewVideo" },
          generalInfo: { $first: "$generalInfo" },
          meta: { $first: "$meta" },
          status: { $first: "$status" },
          tags: { $first: "$tags" },
          author: { $first: "$user.name" },
          learningToolsText: { $first: "$learningToolsText" },
          learningToolsDoc: { $first: "$learningToolsDoc" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);
    if (!course) throw new HttpException(409, "course doesn't exist");
    return course;
  }

  public async createCourse(coursePaylaod: any): Promise<Course> {
    try {
      const newCourse = new CourseModel(coursePaylaod);
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async addCourseProgress(coursePaylaod: any): Promise<any> {
    try {
      // console.log(coursePaylaod);
      const course: any = await CourseModuleModel.find({
        courseId: coursePaylaod.courseId,
      });

      let moduleArr = [];
      course.map((item) => {
        let chapArr = [];
        item.chapter.map((i) => {
          chapArr.push({ chapter_id: i._id });
        });
        moduleArr.push({
          moduleId: item._id.toString(),
          chapter_progress: chapArr,
        });
      });

      let progressArr = {
        userId: coursePaylaod.userId,
        courseId: coursePaylaod.courseId,
        module_progress: moduleArr,
      };
      const newCourse = new CourseProgressModel(progressArr);
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateCourseProgress(
    coursePaylaod: any
  ): Promise<ChapterProgress> {
    try {
      const updateCommentById: any = await CourseProgressModel.findOne({
        userId: coursePaylaod.userId,
        courseId: coursePaylaod.courseId,
      }).exec();

      const updated = updateCommentById?.module_progress.map((item) => {
        if (item.moduleId == coursePaylaod.module_progress.moduleId) {
          item?.chapter_progress.map((test) => {
            if (
              test.chapter_id ==
              coursePaylaod.module_progress.chapter_progress.chapter_id
            ) {
              test.completed =
                coursePaylaod.module_progress.chapter_progress.completed;
            }
          });
        }
        return item;
      });
      await updateCommentById.save();
      if (!updateCommentById)
        throw new HttpException(409, "module doesn't exist");
      return updateCommentById;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getCourseProgress(coursePaylaod: any): Promise<any> {
    try {
      const getProgress = await CourseProgressModel.find(coursePaylaod);
      // await newCourse.save();
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getRecentViewVideos(coursePaylaod: any): Promise<any> {
    try {
      const getProgress = await CourseProgressModel.aggregate([
        { $match: { userId: new Types.ObjectId(coursePaylaod.userId) } },
        { $unwind: "$module_progress" },
        { $unwind: "$module_progress.chapter_progress" },
        {
          $match: {
            "module_progress.chapter_progress.completed": { $lt: 100 },
          },
        },
        {
          $lookup: {
            from: "Courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },
        {
          $group: {
            _id: "$courseId",
            courseDetails: { $first: "$courseDetails" },
            chapters: { $push: "$module_progress.chapter_progress" },
          },
        },
      ]);
      // // await newCourse.save();
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async createCourseModule(coursePaylaod: any): Promise<CourseModule> {
    try {
      const newCourse = new CourseModuleModel(coursePaylaod);
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async addCourseRating(coursePaylaod: any): Promise<CourseRating> {
    try {
      const newCourse = new CourseRatingModel(coursePaylaod);
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getTopCourses(): Promise<any> {
    try {
      const newCourse: Course[] = await CourseModel.find({})
        .sort({ purchaseCount: -1 })
        .limit(10);
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }

  // public async coursePurchase(courseId: string): Promise<Course> {
  //   const course: Course = await CourseModel.findByIdAndUpdate(
  //     courseId,
  //     {
  //       $inc: { purchaseCount: 1 },
  //     },
  //     { new: true }
  //   );
  //   if (!course) throw new HttpException(409, "course doesn't exist");

  //   return course;
  // }

  public async mostViewedCourse(): Promise<Course[]> {
    try {
      const newCourse: Course[] = await CourseModel.find(
        {},
        { thumbnail: 1, course_name: 1, viewCount: 1 }
      )
        .sort({ viewCount: -1 })
        .limit(25);
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async sellingCourse(
    startDate: string,
    endDate: string
  ): Promise<Course[]> {
    try {
      var conditions = {};
      var and_clauses = [];

      if (startDate && startDate != "" && endDate && endDate != "") {
        and_clauses.push({
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(`${endDate}T23:59:59.999Z`),
          },
        });
      }
      conditions["$and"] = and_clauses;
      const getProgress = await PurchaseHistoryModel.aggregate([
        {
          $match: conditions,
        },
        {
          $lookup: {
            from: "Courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },

        {
          $group: {
            _id: "$courseId",
            courseName: { $first: "$courseDetails.course_name" },
            thumbnail: { $first: "$courseDetails.thumbnail" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async dashRatingCourse(
    startDate: string,
    endDate: string
  ): Promise<Course[]> {
    try {
      var conditions = {};
      var and_clauses = [];

      if (startDate && startDate != "" && endDate && endDate != "") {
        and_clauses.push({
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(`${endDate}T23:59:59.999Z`),
          },
        });
      }
      conditions["$and"] = and_clauses;
      const getProgress = await CourseRatingModel.aggregate([
        {
          $match: conditions,
        },
        {
          $lookup: {
            from: "Courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },

        {
          $group: {
            _id: "$courseId",
            courseName: { $first: "$courseDetails.course_name" },
            thumbnail: { $first: "$courseDetails.thumbnail" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async totalCoursesCount() {
    try {
      const total_count = await CourseModel.count();
      return total_count;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async newCoursCount(
    startDate: string,
    endDate: string
  ): Promise<number> {
    try {
      const getProgress = await CourseModel.find({
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(`${endDate}T23:59:59.999Z`),
        },
      }).count();
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async ratingCount(
    startDate: string,
    endDate: string
  ): Promise<number> {
    try {
      const getProgress = await CourseRatingModel.find({
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(`${endDate}T23:59:59.999Z`),
        },
      }).count();
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async purchaseCount(
    startDate: string,
    endDate: string
  ): Promise<number> {
    try {
      const getProgress = await PurchaseHistoryModel.find({
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(`${endDate}T23:59:59.999Z`),
        },
      }).count();
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async dashViewedCourse(
    startDate: string,
    endDate: string
  ): Promise<Course[]> {
    try {
      var conditions = {};
      var and_clauses = [];

      if (startDate && startDate != "" && endDate && endDate != "") {
        and_clauses.push({
          createdAt: {
            $gte: new Date(startDate),
            $lt: new Date(`${endDate}T23:59:59.999Z`),
          },
        });
      }
      conditions["$and"] = and_clauses;
      const getProgress = await CourseViewHistoryModel.aggregate([
        {
          $match: conditions,
        },
        {
          $lookup: {
            from: "Courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        { $unwind: "$courseDetails" },

        {
          $group: {
            _id: "$courseId",
            courseName: { $first: "$courseDetails.course_name" },
            thumbnail: { $first: "$courseDetails.thumbnail" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);
      return getProgress;
    } catch (err) {
      throw new Error(err);
    }
  }
  public async leastViewedCourse(): Promise<Course[]> {
    try {
      const newCourse: Course[] = await CourseModel.find(
        {},
        { thumbnail: 1, course_name: 1, viewCount: 1 }
      )
        .sort({ viewCount: 1 })
        .limit(25);
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async featuredCourse(): Promise<Course[]> {
    try {
      const newCourse: Course[] = await CourseModel.find({})
        .sort({ createdAt: -1 })
        .limit(5);
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async addModuleChapter(
    moduleId: string,
    coursePaylaod: any
  ): Promise<CourseModule> {
    const updateCommentById: CourseModule =
      await CourseModuleModel.findByIdAndUpdate(
        { _id: moduleId },
        { $push: { chapter: { $each: coursePaylaod.chapter } } },
        { new: true }
      );
    if (!updateCommentById)
      throw new HttpException(409, "module doesn't exist");
    return updateCommentById;
  }

  public async removeModuleChapter(
    moduleId: string,
    coursePaylaod: any
  ): Promise<CourseModule> {
    const updateCommentById: CourseModule =
      await CourseModuleModel.findByIdAndUpdate(
        { _id: moduleId },
        { $pull: { chapter: { _id: coursePaylaod.chapterId } } },
        { new: true }
      );
    if (!updateCommentById)
      throw new HttpException(409, "module doesn't exist");
    return updateCommentById;
  }
  public async getRecommendedCourse(
    categoryId: string
    // coursePaylaod: any
  ): Promise<any> {
    const user: any = await UserModel.findOne({ _id: categoryId });
    console.log(user);
    const updateCommentById: any = await CourseModel.find({
      category_id: { $in: user.categories },
    });
    if (!updateCommentById)
      throw new HttpException(409, "category doesn't exist");
    return updateCommentById;
  }

  public async updateModuleChapter(
    chapterId: string,
    CourseData: any
  ): Promise<CourseModule> {
    const course = await CourseModuleModel.findOneAndUpdate(
      { "chapter._id": chapterId },
      {
        $set: { "chapter.$": CourseData },
      },
      { new: true }
    );
    if (!course) {
      throw new HttpException(400, "Invalid Course Id");
    }
    return course;
  }
  public async viewCourse(courseId: string, userId: string): Promise<any> {
    try {
      const newCourse = new CourseViewHistoryModel({ courseId, userId });
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateCourse(
    courseId: string,
    CourseData: any
  ): Promise<Course> {
    const course: Course = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        ...CourseData,
      },
      { new: true }
    );
    if (!course) throw new HttpException(409, "course doesn't exist");

    return course;
  }
  public async updateModule(
    moduleId: string,
    CourseData: any
  ): Promise<CourseModule> {
    const updateCourse: CourseModule =
      await CourseModuleModel.findByIdAndUpdate(
        moduleId,
        {
          ...CourseData,
        },
        { new: true }
      );
    if (!updateCourse) throw new HttpException(409, "module doesn't exist");
    return updateCourse;
  }

  public async deleteCourse(courseId: string) {
    try {
      const course = await CourseModel.findById(courseId);
      if (!course) {
        throw new HttpException(400, "Invalid Course Id");
      }
      await CourseModel.findByIdAndDelete(courseId);
      return {
        success: true,
        message: `${course.course_name} Deleted Successfully`,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
  public async deleteModule(courseId: string) {
    try {
      const course = await CourseModuleModel.findById(courseId);
      if (!course) {
        throw new HttpException(400, "Invalid Course Id");
      }
      await CourseModuleModel.findByIdAndDelete(courseId);
      return {
        success: true,
        message: `${course.title} Deleted Successfully`,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
