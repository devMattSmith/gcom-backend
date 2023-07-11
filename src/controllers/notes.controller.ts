import { QUERY_PARAMS } from "@/utils/utils";
import { Notes } from "@interfaces/notes.interfaces";
import { NotesService } from "@services/notes.service";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
export class NotesController {
  public notes = Container.get(NotesService);

  public getNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const count = await this.notes.countAllCategory();
      const categoryData: any = req.body;
      const findAllCategoryData: Notes[] = await this.notes.findAllCategory(
        categoryData.courseId,
        categoryData.moduleId,
        categoryData.userId,
        categoryData.chapterId,
        categoryData.sort
      );

      res.status(200).json({ data: findAllCategoryData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }
      res
        .status(200)
        .json(await this.notes.findAllNotes(QUERY_PARAMS(req.query), page));
    } catch (err) {
      next(err);
    }
  };

  // public getCategoryById = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const categoryId: string = req.params.id;
  //     const findOneCategoryData: Category =
  //       await this.category.findCategoryById(categoryId);

  //     res.status(200).json({ data: findOneCategoryData, message: "findOne" });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public createNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryData: Notes = req.body;
      const createCategoryData: Notes = await this.notes.createNote(
        categoryData
      );

      res.status(201).json({ data: createCategoryData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryId: string = req.params.id;
      const categoryData: Notes = req.body;

      const updateCategoryData: Notes = await this.notes.updateNote(
        categoryId,
        categoryData
      );

      res.status(200).json({ data: updateCategoryData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notesId: string = req.params.id;
      const deleteNoteData: Notes = await this.notes.deleteNotes(notesId);

      res.status(200).json({ data: deleteNoteData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
