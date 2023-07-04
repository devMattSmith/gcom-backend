import { UserSubscriptionController } from '@/controllers/userSubscription.controller';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class UserSubscriptionRoute implements Routes {
  public path = '/api/v1/userSubscription';
  public router = Router();
  public userSubscription = new UserSubscriptionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.userSubscription.findAll);
    this.router.get(`${this.path}/:id`, this.userSubscription.findOneUserSubscription);
    this.router.get(`${this.path}/:id/user`, this.userSubscription.findAllUserSubscription);
    this.router.post(`${this.path}`, this.userSubscription.createSubscription);
    this.router.post(`${this.path}/:id/cancel`, this.userSubscription.cancelSubscription);
  }
}
