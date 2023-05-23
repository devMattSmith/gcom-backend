import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Country } from "@interfaces/country.interfaces";
import { CountryModel } from "@models/country.model";

@Service()
export class CountryService {
  public async findAllCountry(skip: number, limit: number): Promise<Country[]> {
    const country: Country[] = await CountryModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ dt_added: -1 })
      .lean()
      .exec();

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
}
