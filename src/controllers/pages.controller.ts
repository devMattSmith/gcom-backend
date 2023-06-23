import { QUERY_PARAMS } from '@/utils/utils';
import { Pages } from '@interfaces/pages.interfaces';
import { PagesService } from '@services/pages.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
export class PagesController {
  public pages = Container.get(PagesService);

  public getPages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPageData: Pages[] = await this.pages.findAllPages();

      res.status(200).json({ data: findAllPageData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAllPages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }

      res.status(200).json(await this.pages.find(QUERY_PARAMS(req.query), page));
    } catch (err) {
      next(err);
    }
  };

  public getPageById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageId: string = req.params.id;
      const findOneCategoryData: Pages = await this.pages.findPageById(pageId);

      res.status(200).json({ data: findOneCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageData: Pages = req.body;

      const createPageData: Pages = await this.pages.createPage(pageData);

      res.status(201).json({ data: createPageData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageId: string = req.params.id;
      const pageData: Pages = req.body;
      const updatePageData: Pages = await this.pages.updatePage(pageId, pageData);

      res.status(200).json({ data: updatePageData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pageId: string = req.params.id;
      const deletePageData: Pages = await this.pages.deletePage(pageId);

      res.status(200).json({ data: deletePageData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
