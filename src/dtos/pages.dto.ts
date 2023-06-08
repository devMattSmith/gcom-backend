import {
  IsNotEmpty,
  IsString
} from "class-validator";

export class CreatePagesDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
