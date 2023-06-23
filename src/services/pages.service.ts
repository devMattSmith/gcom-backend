import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Pages } from "@interfaces/pages.interfaces";
import { PagesModel } from "@models/pages.model";
import aqp from "api-query-params";

@Service()
export class PagesService {
  public async findAllPages(): Promise<Pages[]> {
    const pages: Pages[] = await PagesModel.find();
    return pages;
  }

  public async find(params: any, page) {
    const { filter, limit, skip, sort } = <any>aqp(params);
    const pages = await PagesModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
    const total_count = await PagesModel.count();
    return {
      pages,
      meta: {
        page_limit: limit,
        current_page: page,
        total_count,
      },
    };
  }


  public async countAllPages(): Promise<number> {
    const pages: number = await PagesModel.count();
    return pages;
  }

  public async findPageById(pageId: string): Promise<Pages> {
    const findPage: Pages = await PagesModel.findOne({ _id: pageId });
    if (!findPage) throw new HttpException(409, "page doesn't exist");

    return findPage;
  }

  public async createPage(pageData: Pages): Promise<Pages> {
    const createPageData: Pages = await PagesModel.create({
      ...pageData,
    });

    return createPageData;
  }

  public async updatePage(pageId: string, pageData: Pages): Promise<Pages> {
    const updatePageById: Pages = await PagesModel.findByIdAndUpdate(
      pageId,
      {
        ...pageData,
      },
      { new: true }
    );
    if (!updatePageById) throw new HttpException(409, "Page doesn't exist");

    return updatePageById;
  }

  public async deletePage(pageId: string): Promise<Pages> {
    const deletePageById: Pages = await PagesModel.findByIdAndDelete(pageId);
    if (!deletePageById) throw new HttpException(409, "Page doesn't exist");

    return deletePageById;
  }
}
