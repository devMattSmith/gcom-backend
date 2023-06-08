import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Category } from "@interfaces/category.interfaces";
import { CategoryModel } from "@models/category.model";

@Service()
// FIX: standardize status code 
export class CategoryService {
  public async findAllCategory(): Promise<Category[]> {
    // FIX: Why Category Have Status field and Deleted Insted of getting all User need active categories
    const category: Category[] = await CategoryModel.find();

    // SUGGESTION  we can handle both response in one route 
    // why we need a seprate route
  //  const response = { category: category, count: await CategoryModel.find().count() }
    return category;
  }

  public async countAllCategory(): Promise<number> {
    const category: number = await CategoryModel.count();
    return category;
  }

  public async findCategoryById(categoryId: string): Promise<Category> {
    const findCategory: Category = await CategoryModel.findOne({
      _id: categoryId,
    });
    if (!findCategory) throw new HttpException(409, "Category doesn't exist");

    return findCategory;
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
