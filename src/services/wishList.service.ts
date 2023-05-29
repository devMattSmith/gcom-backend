import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { WishList } from "@interfaces/wishList.interfaces";
import { WishListModel } from "@models/wishList.model";

@Service()
export class WishListService {
  public async findAllCategory(): Promise<WishList[]> {
    const wishlist: WishList[] = await WishListModel.find();
    return wishlist;
  }

  public async createWishList(wishListData: WishList): Promise<WishList> {
    const createWishListData: WishList = await WishListModel.create({
      ...wishListData,
    });

    return createWishListData;
  }
}
