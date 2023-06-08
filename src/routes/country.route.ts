import { CountryController } from "@controllers/country.controller";
import { CreateCountryDto } from "@dtos/country.dto";
import { Routes } from "@interfaces/routes.interface";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { Router } from "express";

export class CountryRoute implements Routes {
  public path = "/api/v1/country";
  public router = Router();
  public country = new CountryController();

  constructor() {
    this.initializeRoutes();
  }

  // Why Get ALL countries in POST METHOD
  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      AuthMiddleware,
      this.country.getAllCountry
    );

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateCountryDto, true),
      AuthMiddleware,
      this.country.createCountry
    );
  }
}
