import { Router } from "express";
import { UserController } from "@controllers/users.controller";
import { CreateUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";
export class UserRoute implements Routes {
  public path = "/api/v1/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/updatePassword/:id`,
      // AuthMiddleware,
      // ValidationMiddleware(CreateUserDto, true),
      this.user.updatePassword
    );
    this.router.post(`${this.path}`, AuthMiddleware, this.user.getUsers);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.user.getUserById);
    this.router.get(
      `${this.path}/getViewedCourses/:id`,
      //    AuthMiddleware,
      this.user.getViwedCourses
    );
    this.router.post(
      `${this.path}/create`,
      AuthMiddleware,
      ValidationMiddleware(CreateUserDto, true),
      this.user.createUser
    );

    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateUserDto, true),
      AuthMiddleware,
      this.user.updateUser
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.user.deleteUser
    );
  }
}
