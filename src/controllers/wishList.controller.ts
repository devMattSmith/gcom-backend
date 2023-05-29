import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { WishList } from "@interfaces/wishList.interfaces";
import { WishListService } from "@services/wishList.service";
import { DATATABLE } from "@config";
export class WishListController {
  public wishList = Container.get(WishListService);

  public getWishList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const count = await this.wishList.countAllCategory();
      const findAllCategoryData: WishList[] =
        await this.wishList.findAllCategory();

      res.status(200).json({ data: findAllCategoryData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public createWishList = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const wishlistData: WishList = req.body;
      const createWishListData: WishList = await this.wishList.createWishList(
        wishlistData
      );

      res.status(201).json({ data: createWishListData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}
