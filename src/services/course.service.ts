import { HttpException } from "@/exceptions/httpException";
import { Course, CourseModule } from "@/interfaces/course.interfaces";

import { CourseModel } from "@/models/course.model";
import { CourseModuleModel } from "@/models/courseModule.model";
import { Service } from "typedi";

@Service()
export class CourseService {
  public async findAllCourses(): Promise<any[]> {
    const findReviews: any[] = await CourseModel.aggregate([
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

      // {
      //   $match: { "user._id": new Types.ObjectId(userId) },
      // },
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
          subscriptions: "6",
        },
      },
    ]);
    if (!findReviews) throw new HttpException(409, "course doesn't exist");
    return findReviews;
    // return await CourseModel.find();
  }

  public async countAllCategory(): Promise<number> {
    return await CourseModel.count();
  }

  public async findCourseById(courseId: string): Promise<Course> {
    const course = await CourseModel.findById(courseId);
    if (!course) throw new HttpException(409, "Invalid Course");
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
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new HttpException(400, "Invalid Course Id");
    }
    return await CourseModel.findByIdAndUpdate(courseId, CourseData, {
      new: true,
    });
  }
  public async updateModule(
    moduleId: string,
    CourseData: any
  ): Promise<CourseModule> {
    const updateTicket: CourseModule =
      await CourseModuleModel.findByIdAndUpdate(
        moduleId,
        {
          ...CourseData,
        },
        { new: true }
      );
    if (!updateTicket) throw new HttpException(409, "module doesn't exist");
    return updateTicket;
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
      await CourseModel.findByIdAndDelete(courseId);
      return {
        success: true,
        message: `${course.title} Deleted Successfully`,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
