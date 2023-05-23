import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { CountryService } from "@services/country.service";
import { Country } from "@interfaces/country.interfaces";
import { DATATABLE } from "@config";
export class CountryController {
  public country = Container.get(CountryService);

  public getAllCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { skip, limit, search } = req.body;

      skip = skip ? Number(skip) : DATATABLE.skip;
      limit = limit ? Number(limit) : DATATABLE.limit;

      const count = await this.country.countAllCountry();
      const findAllCountryData: Country[] = await this.country.findAllCountry(
        skip,
        limit
      );

      res
        .status(200)
        .json({ data: findAllCountryData, count, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public createCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageData: Country = req.body;

      const createCountryData: Country = await this.country.createCountry(
        pageData
      );

      res.status(201).json({ data: createCountryData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}
