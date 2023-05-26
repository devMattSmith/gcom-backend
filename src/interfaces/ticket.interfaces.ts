export interface Ticket {
  _id?: string;
  title: String;
  clientName: String;
  description: String;
  orderId: String;
  labels: String;
  assigntTo: String;
  dueDate: String;
  priority: number;
  status: Boolean;
}
