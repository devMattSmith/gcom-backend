import { HelpSupportController } from "@/controllers/helpSupport.controller";
import { CreateHelpSupportDto } from "@dtos/helpSupport.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { Router } from "express";

export class HelpSupportRoute implements Routes {
  public path = "/api/v1/helpSupport";
  public router = Router();
  public helpSupport = new HelpSupportController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.helpSupport.getHelpSupportRequests);
    this.router.get(`${this.path}/:id`, this.helpSupport.getHelpSupportById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateHelpSupportDto, true),
      this.helpSupport.createHelpSupportRequest
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateHelpSupportDto, true),
      this.helpSupport.updateHelpSupportrequest
    );
    this.router.delete(`${this.path}/:id`, this.helpSupport.deleteHelpSupport);
  }
}
