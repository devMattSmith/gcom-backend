import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RoleService } from '@services/role.service';
export class RoleController {
  public reviews = Container.get(RoleService);

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getAllRoles = await this.reviews.getAll();
      res.status(200).json({ data: getAllRoles, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await this.reviews.create(req.body);
      res.status(201).json({ data: role, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.info(req.body)
      const role = await this.reviews.update(req.body);
      res.status(200).json({ data: role, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public getByRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await this.reviews.getByRole(req.params.id);
      res.status(200).json({ data: role, message: 'findOne' });
    } catch (err) {
      next(err);
    }
  };
}
