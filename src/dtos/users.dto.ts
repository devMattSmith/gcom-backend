import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Validate,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: "Password must be longer than or equal to 8 characters",
  })
  @MaxLength(32)
  public password: string;

  public deviceInfo: any;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
