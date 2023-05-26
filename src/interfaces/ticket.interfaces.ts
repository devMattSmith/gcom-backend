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
export interface TicketCountAPI {
  totalTicketCount: number;
  totalTicketPercentage: String;
  totalPendingTicketCount: number;
  allPendingTicketPercentage: String;
  totalCloseTicketCount: number;
  allCloseTicketPercentage: String;
  totalDeleteTicketCount: number;
  allDeleteTicketPercentage: String;
}
