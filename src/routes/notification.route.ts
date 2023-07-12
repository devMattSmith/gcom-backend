import { NotificationController } from '@/controllers/notification.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { NotificationDto, UpdateNotification } from '@interfaces/notification.interface';
import { Router } from 'express';
export class NotificationRoutes implements Routes {
  public path = '/api/v1/notification';
  public router = Router();
  public notification = new NotificationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.notification.getAllNotification);
    this.router.get(`${this.path}/user/:id`, AuthMiddleware, this.notification.getUserNotification);
    this.router.post(this.path, ValidationMiddleware(NotificationDto, true), this.notification.createNotification);
    this.router.get(`${this.path}/:id`, this.notification.getNotificationById);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateNotification, true), this.notification.updateNotification);
    this.router.delete(`${this.path}/:id`, this.notification.deleteNotification);
  }
}
