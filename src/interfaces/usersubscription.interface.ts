export interface IUserSubscription {
  plan: string;
  user: string;
  startDate?: Date;
  status?: boolean;
  endDate?: Date;
  transactionRef?: any;
}
