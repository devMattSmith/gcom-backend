import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Category } from "@interfaces/category.interfaces";
import { CategoryModel } from "@models/category.model";

@Service()
export class CategoryService {
  public async findAllCategory(
    skip: number,
    limit: number
  ): Promise<Category[]> {
    const category: Category[] = await CategoryModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ dt_added: -1 })
      .lean()
      .exec();

    return category;
  }
  public async countAllCategory(): Promise<number> {
    const category: number = await CategoryModel.count();
    return category;
  }

  public async findCategoryById(categoryId: string): Promise<Category> {
    const findUser: Category = await CategoryModel.findOne({ _id: categoryId });
    if (!findUser) throw new HttpException(409, "Category doesn't exist");

    return findUser;
  }

  public async createCategory(categoryData: Category): Promise<Category> {
    const createCategoryData: Category = await CategoryModel.create({
      ...categoryData,
    });

    return createCategoryData;
  }

  public async updateCategory(
    categoryId: string,
    categoryData: Category
  ): Promise<Category> {
    const updateCategoryById: Category = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { ...categoryData },
      { new: true }
    );

    if (!updateCategoryById)
      throw new HttpException(409, "Category doesn't exist");

    return updateCategoryById;
  }

  public async deleteCategory(categoryId: string): Promise<Category> {
    const deleteCategoryById: Category = await CategoryModel.findByIdAndDelete(
      categoryId
    );
    if (!deleteCategoryById)
      throw new HttpException(409, "Category doesn't exist");

    return deleteCategoryById;
  }
}
