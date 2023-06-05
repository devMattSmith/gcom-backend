import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateHelpSupportDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
