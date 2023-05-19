import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreatePagesDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
