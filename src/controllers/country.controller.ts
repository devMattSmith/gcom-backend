import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CountryService } from '@services/country.service';
import { Country } from '@interfaces/country.interfaces';
import { DATATABLE } from '@config';
import { QUERY_PARAMS } from '@/utils/utils';
export class CountryController {
  public country = Container.get(CountryService);

  public getAllCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCountryData: Country[] = await this.country.findAllCountry();

      res.status(200).json({ data: findAllCountryData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }
      res.status(200).json(await this.country.find(QUERY_PARAMS(req.query), page));
    } catch (error) {
      next(error);
    }
  };

  public createCountry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageData: Country = req.body;

      const createCountryData: Country = await this.country.createCountry(pageData);

      res.status(201).json({ data: createCountryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
