import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
