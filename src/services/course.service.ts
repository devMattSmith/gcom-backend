import { HttpException } from '@/exceptions/httpException';
import { Course } from '@/interfaces/course.interfaces';
import { CourseModel } from '@/models/course.model';
import { Service } from 'typedi';

@Service()
export class CourseService {
  public async findAllCourses(): Promise<Course[]> {
    return await CourseModel.find();
  }

  public async countAllCategory(): Promise<number> {
    return await CourseModel.count();
  }

  public async findCourseById(courseId: string): Promise<Course> {
    const course = await CourseModel.findById(courseId);
    if (!course) throw new HttpException(409, 'Invalid Course');
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

  public async updateCourse(courseId: string, CourseData: any): Promise<Course> {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      throw new HttpException(400, 'Invalid Course Id');
    }
    return await CourseModel.findByIdAndUpdate(courseId, CourseData, { new: true });
  }

  public async deleteCourse(courseId: string) {
    try {
      const course = await CourseModel.findById(courseId);
      if (!course) {
        throw new HttpException(400, 'Invalid Course Id');
      }
      await CourseModel.findByIdAndDelete(courseId);
      return { success: true, message: `${course.course_name} Deleted Successfully` };
    } catch (err) {
      throw new Error(err);
    }
  }
}
