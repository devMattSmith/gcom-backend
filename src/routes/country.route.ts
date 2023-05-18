import { Router } from "express";
import { UserController } from "@controllers/users.controller";
import { CreateUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
export class UserRoute implements Routes {
  public path = "/v1/users";
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    // this.router.post(
    //   `${this.path}`,
    //   ValidationMiddleware(CreateUserDto, "body"),
    //   this.user.createUser
    // );
    this.router.put(
      `${this.path}/:id`,
      // ValidationMiddleware(CreateUserDto, "body", true),
      this.user.updateUser
    );
    this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
