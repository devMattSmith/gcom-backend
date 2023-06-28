export interface PaymentHistory {
  _id?: string;
  userId: String;
  orderId: String;
  corseId: String;
  amount: number;
  method: number;
  type: number;
  isDelete: number;
  status: number;
}
