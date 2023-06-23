import { QUERY_PARAMS } from "@/utils/utils";
import { MyList } from "@interfaces/myList.interfaces";
import { MyListService } from "@services/myList.service";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
export class MyListController {
  public myList = Container.get(MyListService);

  public getMyList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const findAllMyListData: MyList[] = await this.myList.findAllMyList(
        userId
      );

      res.status(200).json({ data: findAllMyListData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getAllMyList = async( req: Request, res: Response, next: NextFunction) => {
    try {
      let query_page: any  = req.query.page
      let page: any = 1

      if(query_page){
        page = parseInt(query_page)
      } 
      res.status(200).json(await this.myList.find(QUERY_PARAMS(req.query), page));
    } catch (error) {
      next(error);
    }
  }

  public createMyList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const mylistData: MyList = req.body;
      const createMyListData: MyList = await this.myList.createMyList(
        mylistData
      );

      res.status(201).json({ data: createMyListData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
  public addCourseMyList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const mylistData: MyList = req.body;
      const addMyListData: MyList = await this.myList.addCourseMyList(
        mylistData
      );

      res.status(201).json({ data: addMyListData, message: "added" });
    } catch (error) {
      next(error);
    }
  };

  public removeCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const removeCourse: MyList[] = req.body;

      const removeMyListData: MyList = await this.myList.removeCourse(
        removeCourse
      );
      res.status(201).json({ data: removeMyListData, message: "remove" });
    } catch (error) {
      next(error);
    }
  };

  public updateMyList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const myListId: string = req.params.id;
      const userData: MyList = req.body;
      const updateUserData: MyList = await this.myList.updateMyList(
        myListId,
        userData
      );

      res.status(200).json({ data: updateUserData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };
  public deleteMyList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const listId: string = req.params.id;
      const deleteListData: MyList = await this.myList.deleteMyList(listId);

      res.status(200).json({ data: deleteListData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
