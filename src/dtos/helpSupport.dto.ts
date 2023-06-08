import {
  IsNotEmpty,
  IsString
} from "class-validator";

export class CreateHelpSupportDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
