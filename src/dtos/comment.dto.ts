import {
  IsNotEmpty,
  IsString
} from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
