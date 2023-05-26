import { Router } from "express";
import { UserController } from "@controllers/users.controller";
import { CreateUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class UserRoute implements Routes {
  public path = "/api/v1/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateUserDto, true),
      this.user.createUser
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateUserDto, true),
      this.user.updateUser
    );
    this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
