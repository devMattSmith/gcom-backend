import { model, Schema, Document } from "mongoose";
import { Ticket } from "@/interfaces/ticket.interfaces";
import { PRIORITY, STATUS } from "../utils/constant";
const ObjectId = Schema.Types.ObjectId;
const TicketSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    orderId: {
      type: String,
    },
    labels: [
      {
        type: String,
      },
    ],
    clientName: {
      type: String,
    },
    assignTo: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    dueDate: {
      type: Date,
    },
    priority: {
      type: Number,
      enum: PRIORITY,
      default: 1,
    },
    status: {
      type: Number,
      enum: STATUS,
      default: 1,
    },
  },
  { timestamps: true, versionKey: false }
);

export const TicketModel = model<Ticket & Document>(
  "Ticket",
  TicketSchema,
  "Ticket"
);
