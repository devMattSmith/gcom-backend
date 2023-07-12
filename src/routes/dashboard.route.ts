import { Router } from "express"
import { Routes } from "@interfaces/routes.interface";
import { DashboardController } from "@/controllers/dashboard.controller";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { DashboardFilter } from "@/dtos/dashboard.dto";

export class DashboardRoute implements Routes {
  public path = '/api/v1/sales_dashboard';
  public router = Router();
  public dashboard = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

    private initializeRoutes() {
      this.router.get(`${this.path}/stats`,ValidationMiddleware(DashboardFilter,true),this.dashboard.statsCount)
  }
}