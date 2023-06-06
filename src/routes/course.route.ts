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
    this.router.get(this.path, this.course.getAllCourse);
    this.router.get(`${this.path}/:id`, this.course.getCourse);
    this.router.post(`${this.path}/create`, this.course.createCourse);
    this.router.post(`${this.path}/addModule`, this.course.createCourseModule);
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
    this.router.delete(`${this.path}/:id`, this.course.deleteCourse);
    this.router.delete(`${this.path}/:id`, this.course.deleteModule);
  }
}
