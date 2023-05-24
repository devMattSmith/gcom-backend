import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
