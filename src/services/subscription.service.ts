import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Subscriptions } from "@interfaces/subscriptions.interfaces";
import { SubscriptionsModel } from "@models/subscriptions.model";

@Service()
export class SubscriptionService {
  public async findAllSubscription(): Promise<Subscriptions[]> {
    const subscription: Subscriptions[] = await SubscriptionsModel.find();
    return subscription;
  }
  // public async countAllCategory(): Promise<number> {
  //   const category: number = await CategoryModel.count();
  //   return category;
  // }
  // public async findCategoryById(categoryId: string): Promise<Category> {
  //   const findCategory: Category = await CategoryModel.findOne({
  //     _id: categoryId,
  //   });
  //   if (!findCategory) throw new HttpException(409, "Category doesn't exist");
  //   return findCategory;
  // }
  public async createSubscription(
    subscriptionData: Subscriptions
  ): Promise<Subscriptions> {
    const createSubscriptionData: Subscriptions =
      await SubscriptionsModel.create({
        ...subscriptionData,
      });
    return createSubscriptionData;
  }
  public async updateSubscription(
    categoryId: string,
    categoryData: Subscriptions
  ): Promise<Subscriptions> {
    const updateCategoryById: Subscriptions =
      await SubscriptionsModel.findByIdAndUpdate(
        categoryId,
        { ...categoryData },
        { new: true }
      );
    if (!updateCategoryById)
      throw new HttpException(409, "Category doesn't exist");
    return updateCategoryById;
  }
  public async deleteSubscription(
    subscriptionId: string
  ): Promise<Subscriptions> {
    const deleteCategoryById: Subscriptions =
      await SubscriptionsModel.findByIdAndDelete(subscriptionId);
    if (!deleteCategoryById)
      throw new HttpException(409, "Subscription doesn't exist");
    return deleteCategoryById;
  }
}
