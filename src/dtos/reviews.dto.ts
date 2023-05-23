import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
