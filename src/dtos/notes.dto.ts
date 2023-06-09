import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateNotesDto {
  @IsString()
  @IsNotEmpty()
  /// public userId: string;
  public courseId: string;
  public moduleId: string;
  public chapterId: string;
  public text: string;

  // public categoryId: string;
  // public courseId: string;
}
