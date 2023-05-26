import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
