import { CourseController } from "@/controllers/course.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";
export class CourseRoute implements Routes {
  public path = "/api/v1/courses";
  public router = Router();
  public course = new CourseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/featuredCourse`, this.course.featuredCourse);
    this.router.get(`${this.path}/getTopCourses`, this.course.getTopCourses);
    this.router.post(this.path, this.course.getAllCourse);
    this.router.get(`${this.path}/:id`, this.course.getCourse);

    this.router.post(`${this.path}/create`, this.course.createCourse);
    this.router.get(
      `${this.path}/getRecommendedCourse/:id`,
      this.course.getRecommendedCourse
    );
    this.router.post(`${this.path}/addModule`, this.course.createCourseModule);
    this.router.post(
      `${this.path}/addCourseProgress`,
      this.course.addCourseProgress
    );
    this.router.post(
      `${this.path}/updateCourseProgress`,
      this.course.updateCourseProgress
    );
    this.router.post(
      `${this.path}/getCourseProgress`,
      this.course.getCourseProgress
    );
    this.router.put(
      `${this.path}/coursePurchase/:id`,
      this.course.coursePurchase
    );

    this.router.post(
      `${this.path}/getRecentViewVideos`,
      this.course.getRecentViewVideos
    );
    this.router.post(`${this.path}/videoToken`, this.course.getVideoToken);
    this.router.put(`${this.path}/:id/addChapter`, this.course.addChapter);
    this.router.put(
      `${this.path}/:id/removeChapter`,
      this.course.removeChapter
    );
    this.router.put(
      `${this.path}/:id/updateChapter`,
      this.course.updateChapter
    );
    this.router.put(`${this.path}/:id/updateModule`, this.course.updateModule);
    this.router.put(`${this.path}/:id`, this.course.updateCourse);
    this.router.delete(`${this.path}/:id`, this.course.deleteCourse);
    this.router.delete(
      `${this.path}/:id/moduleDelete`,
      this.course.deleteModule
    );
  }
}
