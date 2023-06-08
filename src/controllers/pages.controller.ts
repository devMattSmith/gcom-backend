import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { Pages } from "@interfaces/pages.interfaces";
import { PagesService } from "@services/pages.service";
import { DATATABLE } from "@config";
export class PagesController {
  public pages = Container.get(PagesService);

  public getPages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Suggestion: Why have not handle the paginations
      const findAllPageData: Pages[] = await this.pages.findAllPages();

      res.status(200).json({ data: findAllPageData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getPageById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageId: string = req.params.id;
      const findOneCategoryData: Pages = await this.pages.findPageById(pageId);

      res.status(200).json({ data: findOneCategoryData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageData: Pages = req.body;

      const createPageData: Pages = await this.pages.createPage(pageData);

      res.status(201).json({ data: createPageData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updatePage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageId: string = req.params.id;
      const pageData: Pages = req.body;
      const updatePageData: Pages = await this.pages.updatePage(
        pageId,
        pageData
      );

      res.status(200).json({ data: updatePageData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deletePage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pageId: string = req.params.id;
      const deletePageData: Pages = await this.pages.deletePage(pageId);

      res.status(200).json({ data: deletePageData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
