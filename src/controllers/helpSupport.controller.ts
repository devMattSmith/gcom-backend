import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { HelpSupport } from "@interfaces/helpSupport.interfaces";
import { HelpSupportService } from "@services/helpSupport.service";
import { DATATABLE } from "@config";
export class HelpSupportController {
  public reviews = Container.get(HelpSupportService);

  public getHelpSupportRequests = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { skip, limit, search } = req.body;

      skip = skip ? Number(skip) : DATATABLE.skip;
      limit = limit ? Number(limit) : DATATABLE.limit;

      const count = await this.reviews.countAllHelpSupportRequests();
      const findAllHelpSupportData: HelpSupport[] =
        await this.reviews.findAllHelpSupportRequests(skip, limit);

      res
        .status(200)
        .json({ data: findAllHelpSupportData, count, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getHelpSupportById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const helpSupportId: string = req.params.id;
      const findOneHelpSupportData: HelpSupport =
        await this.reviews.findHelpSupportRequestById(helpSupportId);

      res
        .status(200)
        .json({ data: findOneHelpSupportData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createHelpSupportRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageData: HelpSupport = req.body;

      const createHelpSupportData: HelpSupport =
        await this.reviews.createHelpSupportRequest(pageData);

      res.status(201).json({ data: createHelpSupportData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateHelpSupportrequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviewId: string = req.params.id;
      const reviewData: HelpSupport = req.body;
      const updateHelpSupportData: HelpSupport =
        await this.reviews.updateHelpSupportRequest(reviewId, reviewData);

      res.status(200).json({ data: updateHelpSupportData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteHelpSupport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const helpSupportId: string = req.params.id;
      const deleteHelpSupportData: HelpSupport =
        await this.reviews.deleteHelpSupportRequest(helpSupportId);

      res.status(200).json({ data: deleteHelpSupportData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
