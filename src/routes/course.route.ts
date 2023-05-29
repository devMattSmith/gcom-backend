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
    this.router.get(this.path, AuthMiddleware, this.course.getAllCourse);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.course.getCourse);
    this.router.post(`${this.path}`, AuthMiddleware, this.course.createCourse);
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware,
      this.course.updateCourse
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.course.deleteCourse
    );
  }
}
