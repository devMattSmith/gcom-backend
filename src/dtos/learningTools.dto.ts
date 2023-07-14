import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class LearningToolsDto {
  @IsString()
  @IsNotEmpty()
  public courseId: string;
  public userId: string;
  public name: string;
}
