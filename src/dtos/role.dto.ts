import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  module: string;

  @IsArray()
  @IsString({ each: true })
  features?: string[];
}

export class UpdateRoleDto {
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  module: string;

  @IsArray()
  @IsString({ each: true })
  features?: string[];
}
