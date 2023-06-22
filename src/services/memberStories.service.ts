import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { MemberStories } from "@interfaces/memberStories.interfaces";
import { MemberStoriesModel } from "@models/memberStories.model";

@Service()
export class MemberStoriesService {
  public async findAllMemberStories(): Promise<MemberStories[]> {
    const category: MemberStories[] = await MemberStoriesModel.find();
    return category;
  }

  public async createStory(
    categoryData: MemberStories
  ): Promise<MemberStories> {
    const createCategoryData: MemberStories = await MemberStoriesModel.create({
      ...categoryData,
    });
    return createCategoryData;
  }
}
