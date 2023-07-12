import { IsDateString } from "class-validator";

export class DashboardFilter {
  @IsDateString(undefined, { message: 'Start Date must be ISO Date' })
  start_date: string;

  @IsDateString(undefined, { message: 'end Date must be ISO Date' })
  end_date: string;
}