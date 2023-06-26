import { Country } from "@interfaces/country.interfaces";
import { CountryModel } from "@models/country.model";
import aqp from "api-query-params";
import { Service } from "typedi";

@Service()
export class CountryService {
  public async findAllCountry(): Promise<Country[]> {
    const country: Country[] = await CountryModel.find();
    return country;
  }

  public async countAllCountry(): Promise<number> {
    const country: number = await CountryModel.count();
    return country;
  }

  public async createCountry(countryData: Country): Promise<Country> {
    const createCountryData: Country = await CountryModel.create({
      ...countryData,
    });

    return createCountryData;
  }

  public async find(params: any, page) {
    const { filter, limit, skip, sort } = <any>aqp(params);
    const countries = await CountryModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total_count = await CountryModel.count();
    return {
      countries,
      meta: {
        page_limit: limit,
        current_page: page,
        total_count,
      },
    };
  }
}
