import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { Ticket } from "@/interfaces/ticket.interfaces";
import { TicketService } from "@/services/ticket.service";
import { DATATABLE } from "@config";
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
  public percentage = async (percent: number, total: number) => {
    return ((percent / total) * 100).toFixed(2);
  };
  public getTicketCountById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const curentMonthCount = await this.ticket.countAllCurrentMonth({
        isDelete: false,
      });
      const prevMonthCount = await this.ticket.countAllPrevMonth({
        isDelete: false,
      });
      console.log(curentMonthCount, prevMonthCount);
      console.log(this.percentage(1, 5));
      res.status(200).json({ data: "cxc", message: "findOne" });
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
