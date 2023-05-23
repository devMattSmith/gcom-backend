import { Router } from "express";
import { RoleController } from "@controllers/role.controller";
import { CreateRoleDto } from "@dtos/role.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class RoleRoute implements Routes {
  public path = "/v1/role";
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.role.getRoles);
    this.router.get(`${this.path}/:id`, this.role.getRoleById);
    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateRoleDto, true),
      this.role.createRole
    );
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(CreateRoleDto, true, true),
      this.role.updateRole
    );
    this.router.delete(`${this.path}/:id`, this.role.deleteRole);
  }
}
