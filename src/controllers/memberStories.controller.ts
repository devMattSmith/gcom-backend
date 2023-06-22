import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { MemberStories } from "@interfaces/memberStories.interfaces";
import { MemberStoriesService } from "@services/memberStories.service";

export class MemberStoriesController {
  public memberStory = Container.get(MemberStoriesService);

  public getStories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllCategoryData: MemberStories[] =
        await this.memberStory.findAllMemberStories();

      res.status(200).json({ data: findAllCategoryData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public createStory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categoryData: MemberStories = req.body;
      const createCategoryData: MemberStories =
        await this.memberStory.createStory(categoryData);

      res.status(201).json({ data: createCategoryData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}
