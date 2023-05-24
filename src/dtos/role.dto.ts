import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
