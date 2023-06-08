import { Ticket } from "@/interfaces/ticket.interfaces";
import { HttpException } from "@exceptions/httpException";
import { TicketModel } from "@models/ticket.model";
import { Service } from "typedi";

@Service()
export class TicketService {
  public async findAllTickets(): Promise<Ticket[]> {
    const ticket: Ticket[] = await TicketModel.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "assignTo",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "user",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          orderId: 1,

          clientName: 1,
          assingTo: "$user",
          status: 1,
          // assignTo: 1,
          dueDate: 1,
          priority: 1,
          createdAt: "$createdAt",
        },
      },
    ]);

    return ticket;
  }

  public async countAllTickets(condition: object): Promise<number> {
    const ticket: number = await TicketModel.count(condition);
    return ticket;
  }

  public async countAllPrevMonth(condition: object): Promise<number> {
    const startOfCurrentMonth = new Date();
    startOfCurrentMonth.setDate(1);

    const startOfPreviewsMonth = new Date();
    startOfPreviewsMonth.setDate(1);
    startOfPreviewsMonth.setMonth(startOfPreviewsMonth.getMonth() - 1);

    // FIX: dt_added is not in Schema
    const prevCount = await TicketModel.find({
      $and: [
        condition,
        {
          dt_added: {
            $gte: startOfPreviewsMonth,
            $lt: startOfCurrentMonth,
          },
        },
      ],
    }).count();
    return prevCount;
  }
  public async countAllCurrentMonth(condition: object): Promise<number> {
    const startOfCurrentMonth = new Date();
    startOfCurrentMonth.setDate(1);

    // FIX: dt_added is not in Schema
    const prevCount = await TicketModel.find({
      $and: [
        condition,
        {
          dt_added: {
            $gte: startOfCurrentMonth,
            $lt: new Date(),
          },
        },
      ],
    }).count();

    return prevCount;
  }

  public async findTicketById(ticketId: string): Promise<Ticket> {
    const findTicket: Ticket = await TicketModel.findOne({
      _id: ticketId,
    });
    if (!findTicket) throw new HttpException(409, "Ticket doesn't exist");

    return findTicket;
  }

  // public async monthlyCountById(helpSupportId: string): Promise<HelpSupport> {
  //   const findHelpSupport: HelpSupport = await HelpSupportModel.findOne({
  //     _id: helpSupportId,
  //   });
  //   if (!findHelpSupport)
  //     throw new HttpException(409, "helpSupport doesn't exist");

  //   return findHelpSupport;
  // }

  public async createTicket(ticketData: Ticket): Promise<Ticket> {
    const createTicket: Ticket = await TicketModel.create({
      ...ticketData,
    });

    return createTicket;
  }

  public async updateTicket(
    ticketId: string,
    ticketData: Ticket
  ): Promise<Ticket> {
    const updateTicket: Ticket = await TicketModel.findByIdAndUpdate(
      ticketId,
      {
        ...ticketData,
      },
      { new: true }
    );
    if (!updateTicket) throw new HttpException(409, "Ticket doesn't exist");

    return updateTicket;
  }

  public async deleteTicket(ticketId: string): Promise<Ticket> {
    const deleteTicketById: Ticket = await TicketModel.findByIdAndDelete(
      ticketId
    );
    if (!deleteTicketById) throw new HttpException(409, "Ticket doesn't exist");

    return deleteTicketById;
  }
}
