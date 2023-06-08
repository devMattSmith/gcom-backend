import {
  IsNotEmpty,
  IsString
} from "class-validator";

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
