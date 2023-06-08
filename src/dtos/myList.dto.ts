import {
  IsNotEmpty,
  IsString
} from "class-validator";

// FIX: using mongid string validation use IsMongoId 
// @IsMongoId({message:'Invalid Course id'})
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
  // @IsMongoId({message:'Invalid Course id'})
  @IsNotEmpty()
  public courseId: string;
  public wishListId: string;
}
