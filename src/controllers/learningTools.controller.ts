import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { LearningTools } from "@interfaces/learningTools.interfaces";
import { LearningToolsService } from "@services/learningTools.service";

export class LearningToolsController {
  public learningTools = Container.get(LearningToolsService);

  public getEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { courseId, userId } = req.body;
      const findAlllLearningToolData: any =
        await this.learningTools.findAllLearningToolEvents(courseId, userId);

      res
        .status(200)
        .json({ data: findAlllLearningToolData, message: "find All" });
    } catch (error) {
      next(error);
    }
  };
  public createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const learningToolData: LearningTools = req.body;
      const createLearningData: LearningTools =
        await this.learningTools.createLearningToolsEvent(learningToolData);

      res.status(201).json({ data: createLearningData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eventId: string = req.params.id;
      const eventData: LearningTools = req.body;

      const updateEventData: LearningTools =
        await this.learningTools.updateLearnignToolEvent(eventId, eventData);

      res.status(200).json({ data: updateEventData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eventId: string = req.params.id;
      const deleteEventData: LearningTools =
        await this.learningTools.deleteCategory(eventId);

      res.status(200).json({ data: deleteEventData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
