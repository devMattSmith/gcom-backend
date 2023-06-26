import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { PurchaseHistory } from "@interfaces/purchaseHistory.interfaces";
import { PurchaseHistorys } from "@services/purchaseHistory.service";

export class PaymentHistoryController {
  public purchaseHistory = Container.get(PurchaseHistorys);

  public getPurchaseHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const count = await this.category.countAllCategory();
      const findAllCategoryData: PurchaseHistory[] =
        await this.purchaseHistory.findAllPurchaseHistroy();

      res.status(200).json({ data: findAllCategoryData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };
  public getRecentPurchase = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllCategoryData: PurchaseHistory[] =
        await this.purchaseHistory.findAllRecentPurchaseCourse();

      res.status(200).json({ data: findAllCategoryData, message: "findAll" });
    } catch (error) {
      next(error);
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

  public createPurchaseHistroy = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryData: PurchaseHistory = req.body;
      const createCategoryData: PurchaseHistory =
        await this.purchaseHistory.createPurchaseHistroy(categoryData);

      res.status(201).json({ data: createCategoryData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  // public updateCategory = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const categoryId: string = req.params.id;
  //     const categoryData: Category = req.body;

  //     const updateCategoryData: Category = await this.category.updateCategory(
  //       categoryId,
  //       categoryData
  //     );

  //     res.status(200).json({ data: updateCategoryData, message: "updated" });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteCategory = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const categoryId: string = req.params.id;
  //     const deleteCategoryData: Category = await this.category.deleteCategory(
  //       categoryId
  //     );

  //     res.status(200).json({ data: deleteCategoryData, message: "deleted" });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
