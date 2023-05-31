import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateMyListDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
  public userId: string;
}
export class UpdateMyListDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}

export class addCourseMyListDto {
  @IsNotEmpty()
  public courseId: string;
  public wishListId: string;
}
