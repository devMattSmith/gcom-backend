export interface CommentChild {
  _id?: String;
  reply: String;
  userId: String;
}

export interface Comment {
  _id?: String;
  comment: String;
  userId: String;
  ticketId: String;
  isDelete: Boolean;
  replies: [CommentChild];
}
