import { UserActivityController } from '@/controllers/userActivity.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class UserActivityRoute implements Routes {
  public path = '/api/v1/userActivity';
  public router = Router();
  public userActivity = new UserActivityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, AuthMiddleware, this.userActivity.getUserActivity);
  }
}
