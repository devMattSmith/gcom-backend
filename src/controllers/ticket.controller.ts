import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { Ticket, TicketCountAPI } from "@/interfaces/ticket.interfaces";
import { TicketService } from "@/services/ticket.service";
import { DATATABLE } from "@config";
import { STATUS } from "../utils/constant";
export class TicketController {
  public ticket = Container.get(TicketService);

  public getTickets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllTicketsData: Ticket[] = await this.ticket.findAllTickets();

      res.status(200).json({ data: findAllTicketsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getTicketById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ticketId: string = req.params.id;
      const findOneTicketData: Ticket = await this.ticket.findTicketById(
        ticketId
      );

      res.status(200).json({ data: findOneTicketData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };
  public percentage = async (currentMonth: number, oldMonth: number) => {
    return (((currentMonth - oldMonth) / oldMonth) * 100).toFixed(2);
  };
  public getTicketCountById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      /* all tickets */
      const curentMonthAllCount = await this.ticket.countAllCurrentMonth({
        isDelete: false,
      });
      const prevMonthAllCount = await this.ticket.countAllPrevMonth({
        isDelete: false,
      });
      const totalTicketCount = await this.ticket.countAllTickets({
        isdelete: false,
      });
      const totalTicketPercentage = await this.percentage(
        curentMonthAllCount,
        prevMonthAllCount
      );

      /* ------- */
      /* pending */
      const curentMonthAllPendingCount = await this.ticket.countAllCurrentMonth(
        {
          isDelete: false,
          status: STATUS.INPROGRESS,
        }
      );
      const prevMonthAllPendingCount = await this.ticket.countAllPrevMonth({
        isDelete: false,
        status: STATUS.INPROGRESS,
      });
      const totalPendingTicketCount = await this.ticket.countAllTickets({
        isDelete: false,
        status: STATUS.INPROGRESS,
      });
      const allPendingTicketPercentage = await this.percentage(
        curentMonthAllPendingCount,
        prevMonthAllPendingCount
      );
      /* ------- */

      /* close */
      const curentMonthAllCloseCount = await this.ticket.countAllCurrentMonth({
        isDelete: false,
        status: STATUS.CLOSED,
      });
      const prevMonthAllCloseCount = await this.ticket.countAllPrevMonth({
        isDelete: false,
        status: STATUS.CLOSED,
      });
      const totalCloseTicketCount = await this.ticket.countAllTickets({
        isDelete: false,
        status: STATUS.CLOSED,
      });
      const allCloseTicketPercentage = await this.percentage(
        curentMonthAllCloseCount,
        prevMonthAllCloseCount
      );
      /* ------- */

      /* delete */
      const curentMonthAllDeleteCount = await this.ticket.countAllCurrentMonth({
        isDelete: true,
      });
      const prevMonthAllDeleteCount = await this.ticket.countAllPrevMonth({
        isDelete: true,
      });
      const totalDeleteTicketCount = await this.ticket.countAllTickets({
        isDelete: true,
      });
      const allDeleteTicketPercentage = await this.percentage(
        curentMonthAllDeleteCount,
        prevMonthAllDeleteCount
      );
      /* ------- */
      let tickeCountData: TicketCountAPI = {
        totalTicketCount,
        totalTicketPercentage,
        totalPendingTicketCount,
        allPendingTicketPercentage,
        totalCloseTicketCount,
        allCloseTicketPercentage,
        totalDeleteTicketCount,
        allDeleteTicketPercentage,
      };

      res.status(200).json({ data: tickeCountData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ticketData: Ticket = req.body;

      const createTicketData: Ticket = await this.ticket.createTicket(
        ticketData
      );

      res.status(201).json({ data: createTicketData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ticketId: string = req.params.id;
      const ticketData: Ticket = req.body;
      const updateTicketData: Ticket = await this.ticket.updateTicket(
        ticketId,
        ticketData
      );

      res.status(200).json({ data: updateTicketData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const ticketId: string = req.params.id;
      const deleteTicketData: Ticket = await this.ticket.deleteTicket(ticketId);

      res.status(200).json({ data: deleteTicketData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
