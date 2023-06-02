import { Router } from "express";
import { WishListController } from "@controllers/wishList.controller";
import { CreateWishListDto } from "@dtos/wishList.dto";
import { Routes } from "@interfaces/routes.interface";
import { ValidationMiddleware } from "@middlewares/validation.middleware";
import { isAdmin, AuthMiddleware } from "@middlewares/auth.middleware";
export class WishListRoute implements Routes {
  public path = "/api/v1/wishlist";
  public router = Router();
  public wishList = new WishListController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id`,
      AuthMiddleware,
      this.wishList.getWishList
    );
    this.router.post(
      `${this.path}/removeCourse`,
      AuthMiddleware,
      this.wishList.removeCourse
    );

    this.router.post(
      `${this.path}/create`,
      ValidationMiddleware(CreateWishListDto, true),
      AuthMiddleware,
      this.wishList.updateuserWishList
    );
  }
}
