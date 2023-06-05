import { Router } from 'express';
import { RoleController } from '@controllers/role.controller';
import { CreateRoleDto } from '@dtos/role.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class RoleRoute implements Routes {
  public path = "/api/v1/roles";
  public router = Router();
  public role = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.role.getRoles);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateRoleDto, true), this.role.createRole);
    this.router.put(`${this.path}`, ValidationMiddleware(CreateRoleDto, true), this.role.updateRole);
    this.router.get(`${this.path}/:id`, this.role.getByRole);
  }
}
