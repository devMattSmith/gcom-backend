import {
  IsNotEmpty,
  IsString
} from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
