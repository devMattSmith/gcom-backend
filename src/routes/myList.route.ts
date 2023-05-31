import { Router } from "express";
import { MyListController } from "@controllers/myList.controller";
import {
  CreateMyListDto,
  addCourseMyListDto,
  UpdateMyListDto,
} from "@dtos/myList.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class MyListRoute implements Routes {
  public path = "/api/v1/mylist";
  public router = Router();
  public myList = new MyListController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.myList.getMyList);
    this.router.post(
      `${this.path}/removeCourse`,
      ValidationMiddleware(addCourseMyListDto, true),
      this.myList.removeCourse
    );
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateMyListDto, true),
      this.myList.createMyList
    );
    this.router.post(
      `${this.path}/addCourse`,
      ValidationMiddleware(addCourseMyListDto, true),
      this.myList.addCourseMyList
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(UpdateMyListDto, true),
      this.myList.updateMyList
    );
    this.router.delete(`${this.path}/:id`, this.myList.deleteMyList);
  }
}
