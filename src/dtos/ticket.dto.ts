import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
