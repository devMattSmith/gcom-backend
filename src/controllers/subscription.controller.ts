import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { Subscriptions } from "@interfaces/subscriptions.interfaces";
import { SubscriptionService } from "@services/subscription.service";
import { DATATABLE } from "@config";
export class SubscriptionController {
  public subscription = Container.get(SubscriptionService);

  public getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const count = await this.subscription.();
      const findAllCategoryData: Subscriptions[] =
        await this.subscription.findAllSubscription();

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

  public createSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const subscriptionData: Subscriptions = req.body;
      const createSubscriptionData: Subscriptions =
        await this.subscription.createSubscription(subscriptionData);

      res
        .status(201)
        .json({ data: createSubscriptionData, message: "created" });
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

  public deleteSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const subscriptionId: string = req.params.id;

      const deleteSubscriptionData: Subscriptions =
        await this.subscription.deleteSubscription(subscriptionId);

      res
        .status(200)
        .json({ data: deleteSubscriptionData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
