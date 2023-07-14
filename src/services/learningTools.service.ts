import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { LearningTools } from "@interfaces/learningTools.interfaces";
import { LearningToolsModel } from "@models/learningTools.model";
import { Types } from "mongoose";
@Service()
export class LearningToolsService {
  public async findAllLearningToolEvents(
    courseId: string,
    userId: string
  ): Promise<LearningTools[]> {
    const conditions = {};
    const and_clauses = [];

    if (userId && userId != "" && courseId && courseId != "") {
      and_clauses.push({
        courseId: new Types.ObjectId(courseId),
        userId: new Types.ObjectId(userId),
      });
    }
    conditions["$and"] = and_clauses;
    const learningdata: LearningTools[] = await LearningToolsModel.aggregate([
      {
        $match: conditions,
      },
      {
        $lookup: {
          from: "Courses",
          localField: "courseId",
          foreignField: "_id",
          pipeline: [{ $match: { isDeleted: false } }],
          as: "course",
        },
      },
      {
        $unwind: { path: "$course", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$_id",
          userName: { $first: "$user.name" },
          courseName: { $first: "$course.course_name" },
          platForm: { $first: "$platForm" },
          name: { $first: "$name" },
          frequency: { $first: "$frequency" },
          time: { $first: "$time" },
          endTime: { $first: "$endTime" },
          clientId: { $first: "$clientId" },
          apiKey: { $first: "$apiKey" },
          scope: { $first: "$scope" },
          accessToken: { $first: "$accessToken" },
          discoveryDocs: { $first: "$discoveryDocs" },
          createdAt: { $first: "$createdAt" },
          upatedAt: { $first: "$upatedAt" },
        },
      },
    ]);
    return learningdata;
  }

  public async createLearningToolsEvent(
    learningToolData: LearningTools
  ): Promise<LearningTools> {
    const createLearingToolData: LearningTools =
      await LearningToolsModel.create({
        ...learningToolData,
      });
    return createLearingToolData;
  }
  public async updateLearnignToolEvent(
    eventId: string,
    eventData: LearningTools
  ): Promise<LearningTools> {
    const updateEventById: LearningTools =
      await LearningToolsModel.findByIdAndUpdate(
        eventId,
        { ...eventData },
        { new: true }
      );
    if (!updateEventById) throw new HttpException(409, "event doesn't exist");
    return updateEventById;
  }
  public async deleteCategory(eventId: string): Promise<LearningTools> {
    const deleteEventById: LearningTools =
      await LearningToolsModel.findByIdAndDelete(eventId);
    if (!deleteEventById) throw new HttpException(409, "Event doesn't exist");
    return deleteEventById;
  }
}
