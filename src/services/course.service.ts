import { HttpException } from "@/exceptions/httpException";
import { Course, CourseModule } from "@/interfaces/course.interfaces";

import { CourseModel } from "@/models/course.model";
import { CourseModuleModel } from "@/models/courseModule.model";
import { Service } from "typedi";
import { Types } from "mongoose";
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
          courseBanner: 1,
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
          courseBanner: { $first: "$courseBanner" },
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
  public async createCourseModule(coursePaylaod: any): Promise<CourseModule> {
    try {
      const newCourse = new CourseModuleModel(coursePaylaod);
      await newCourse.save();
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
