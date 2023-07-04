import { IsMongoId } from 'class-validator';

export class UserSubscriptionDto {
  @IsMongoId()
  plan: string;

  @IsMongoId()
  user: string;
}
