import { Router } from "express";
import { CountryController } from "@controllers/country.controller";
import { CreateCountryDto } from "@dtos/country.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class CountryRoute implements Routes {
  public path = "/v1/country";
  public router = Router();
  public country = new CountryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.country.getAllCountry);

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateCountryDto, true, true),
      this.country.createCountry
    );
  }
}
