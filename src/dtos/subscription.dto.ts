import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
