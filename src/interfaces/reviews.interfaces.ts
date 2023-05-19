export interface Reviews {
  _id?: string;
  comment: String;
  courseId: String;
  userId: String;
  description: String;
  rating: Number;
  status: Boolean;
  dt_added: Date;
  dt_upd: Date;
}
