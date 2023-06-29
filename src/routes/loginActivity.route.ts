import { LoginActivityController } from '@/controllers/loginActivity.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class LoginActivityRoute implements Routes {
  public path = '/api/v1/loginActivity';
  public router = Router();
  public loginActivity = new LoginActivityController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.path, AuthMiddleware ,this.loginActivity.getUserLoginActivity);
  }
}
