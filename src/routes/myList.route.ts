import { MyListController } from "@controllers/myList.controller";
import {
  CreateMyListDto,
  UpdateMyListDto,
  addCourseMyListDto,
} from "@dtos/myList.dto";
import { Routes } from "@interfaces/routes.interface";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { Router } from "express";
export class MyListRoute implements Routes {
  public path = "/api/v1/mylist";
  public router = Router();
  public myList = new MyListController();

  constructor() {
    this.initializeRoutes();
  }
// FIX: Have to follow restfull Routes
  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.myList.getMyList);
    this.router.post(
      `${this.path}/removeCourse`,
      ValidationMiddleware(addCourseMyListDto, true),
      AuthMiddleware,
      this.myList.removeCourse
    );
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateMyListDto, true),
      AuthMiddleware,
      this.myList.createMyList
    );
    this.router.post(
      `${this.path}/addCourse`,
      ValidationMiddleware(addCourseMyListDto, true),
      AuthMiddleware,
      this.myList.addCourseMyList
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(UpdateMyListDto, true),
      AuthMiddleware,
      this.myList.updateMyList
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.myList.deleteMyList
    );
  }
}
