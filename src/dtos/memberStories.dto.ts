import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class MemberStoriesDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
