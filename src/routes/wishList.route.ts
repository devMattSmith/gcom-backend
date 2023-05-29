import { Router } from "express";
import { WishListController } from "@controllers/wishList.controller";
import { CreateWishListDto } from "@dtos/wishList.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";

export class WishListRoute implements Routes {
  public path = "/api/v1/wishlist";
  public router = Router();
  public wishList = new WishListController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.wishList.getWishList);

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateWishListDto, true),
      this.wishList.createWishList
    );
  }
}
