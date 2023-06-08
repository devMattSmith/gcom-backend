import { TicketController } from "@/controllers/ticket.controller";
import { CreateTicketDto } from "@/dtos/ticket.dto";
import { Routes } from "@interfaces/routes.interface";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { Router } from "express";

// Routes contains lowercase
export class TicketRoute implements Routes {
  public path = "/api/v1/Ticket";
  public router = Router();
  public ticket = new TicketController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, AuthMiddleware, this.ticket.getTickets);
    this.router.get(
      `${this.path}/:id`,
      AuthMiddleware,
      this.ticket.getTicketById
    );
    // this.router.post(`${this.path}/test`, this.helpSupport.getTicketCountById);
    this.router.post(
      `${this.path}/ticketCount`,
      AuthMiddleware,
      this.ticket.getTicketCountById
    );
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateTicketDto, true),
      AuthMiddleware,
      this.ticket.createTicket
    );

    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateTicketDto, true),
      AuthMiddleware,
      this.ticket.updateTicket
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.ticket.deleteTicket
    );
  }
}
