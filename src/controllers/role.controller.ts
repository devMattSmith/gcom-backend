import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { RoleSchema } from "@interfaces/role.interfaces";
import { RoleService } from "@services/role.service";
import { DATATABLE } from "@config";
export class RoleController {
  public reviews = Container.get(RoleService);

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { skip, limit, search } = req.body;

      skip = skip ? Number(skip) : DATATABLE.skip;
      limit = limit ? Number(limit) : DATATABLE.limit;

      const count = await this.reviews.countAllRoles();
      const findAllHelpSupportData: RoleSchema[] =
        await this.reviews.findAllRoles(skip, limit);

      res
        .status(200)
        .json({ data: findAllHelpSupportData, count, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getRoleById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const helpSupportId: string = req.params.id;
      const findOneHelpSupportData: RoleSchema =
        await this.reviews.findRoleById(helpSupportId);

      res
        .status(200)
        .json({ data: findOneHelpSupportData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageData: RoleSchema = req.body;

      const createHelpSupportData: RoleSchema = await this.reviews.createRole(
        pageData
      );

      res.status(201).json({ data: createHelpSupportData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviewId: string = req.params.id;
      const reviewData: RoleSchema = req.body;
      const updateHelpSupportData: RoleSchema = await this.reviews.updateRole(
        reviewId,
        reviewData
      );

      res.status(200).json({ data: updateHelpSupportData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const helpSupportId: string = req.params.id;
      const deleteHelpSupportData: RoleSchema = await this.reviews.deleteRole(
        helpSupportId
      );

      res.status(200).json({ data: deleteHelpSupportData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
