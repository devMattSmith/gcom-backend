import { Router } from "express";
import { NotesController } from "@controllers/notes.controller";
import { CreateNotesDto } from "@dtos/notes.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";

export class NotesRoute implements Routes {
  public path = "/api/v1/notes";
  public router = Router();
  public notes = new NotesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.notes.getNotes);
    this.router.get(`${this.path}`, this.notes.getAllNotes);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateNotesDto, true),
      AuthMiddleware,
      this.notes.createNotes
    );
    // this.router.post(
    //   `${this.path}/getNotesByMidue`,
    //   // AuthMiddleware,
    //   this.notes.getNotes
    // );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateNotesDto, true),
      AuthMiddleware,
      this.notes.updateNote
    );
    this.router.delete(
      `${this.path}/:id`,
      AuthMiddleware,
      this.notes.deleteNote
    );
  }
}
