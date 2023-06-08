import {
  IsNotEmpty,
  IsString
} from "class-validator";

export class CreateWishListDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;
  // public categoryId: string;
  // public courseId: string;
}
