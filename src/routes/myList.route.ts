import { Router } from "express";
import { MyListController } from "@controllers/myList.controller";
import {
  CreateMyListDto,
  addCourseMyListDto,
  UpdateMyListDto,
} from "@dtos/myList.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";
export class MyListRoute implements Routes {
  public path = "/api/v1/mylist";
  public router = Router();
  public myList = new MyListController();

  constructor() {
    this.initializeRoutes();
  }

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
