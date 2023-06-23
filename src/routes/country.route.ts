import { Router } from 'express';
import { CountryController } from '@controllers/country.controller';
import { CreateCountryDto } from '@dtos/country.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { isAdmin, AuthMiddleware } from '@middlewares/auth.middleware';

export class CountryRoute implements Routes {
  public path = '/api/v1/country';
  public router = Router();
  public country = new CountryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.country.getAllCountry);

    this.router.get(`${this.path}`, this.country.getAllCountries);

    this.router.post(`${this.path}/create`, ValidationMiddleware(CreateCountryDto, true), AuthMiddleware, this.country.createCountry);
  }
}
