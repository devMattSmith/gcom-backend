import { Router } from "express";
import { AuthController } from "@controllers/auth.controller";
import { CreateUserDto } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class AuthRoute implements Routes {
  public path = "/api/v1/auth/";
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}signup`,
      ValidationMiddleware(CreateUserDto, true),
      this.auth.signUp
    );
    this.router.post(
      `${this.path}login`,
      ValidationMiddleware(CreateUserDto, true),
      this.auth.logIn
    );
    this.router.post(
      `${this.path}socialLogin`,
      this.auth.socialLogin
    )
    this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
  }
}
