import { Router } from "express";
import { PagesController } from "@controllers/pages.controller";
import { CreateTicketDto } from "@/dtos/ticket.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { TicketController } from "@/controllers/ticket.controller";
import { isAdmin } from "@middlewares/auth.middleware";
export class TicketRoute implements Routes {
  public path = "/api/v1/Ticket";
  public router = Router();
  public ticket = new TicketController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.ticket.getTickets);
    this.router.get(`${this.path}/:id`, this.ticket.getTicketById);
    // this.router.post(`${this.path}/test`, this.helpSupport.getTicketCountById);
    this.router.post(
      `${this.path}/ticketCount`,
      this.ticket.getTicketCountById
    );
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateTicketDto, true),
      this.ticket.createTicket
    );

    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateTicketDto, true),
      this.ticket.updateTicket
    );
    this.router.delete(`${this.path}/:id`, this.ticket.deleteTicket);
  }
}
