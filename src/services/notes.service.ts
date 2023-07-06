import { hash } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { Notes } from "@interfaces/notes.interfaces";
import { NotesModel } from "@models/notes.model";
import { Types } from "mongoose";
import aqp from "api-query-params";
@Service()
export class NotesService {
  public async findAllCategory(
    courseId: any,
    moduleId: any,
    chapterId: any
  ): Promise<Notes[]> {
    const notes: Notes[] = await NotesModel.aggregate([
      {
        $match: {
          $and: [
            {
              courseId: new Types.ObjectId(courseId),
              moduleId: new Types.ObjectId(moduleId),
              chapterId: chapterId,
            },
          ],
        },
      },

      {
        $lookup: {
          from: "coursemodules",
          localField: "moduleId",
          foreignField: "_id",
          as: "coursemodules",
        },
      },
      {
        $unwind: { path: "$coursemodules", preserveNullAndEmptyArrays: true },
      },

      {
        $group: {
          _id: "$_id",
          durationTime: { $first: "$duringTime" },
          description: { $first: "$description" },
          moduleName: { $first: "$coursemodules.title" },
          chapterName: {
            $first: { $arrayElemAt: ["$coursemodules.chapter.title", 0] },
          },
        },
      },
    ]);
    return notes;
  }

  public async createNote(noteData: Notes): Promise<Notes> {
    const createNoteData: Notes = await NotesModel.create({
      ...noteData,
    });
    return createNoteData;
  }

  public async findAllNotes(params: any, page) {
    const { filter, limit, skip, sort } = <any>aqp(params);
    const notes = await NotesModel.find(filter)
      .populate(["coursemodules", "courses", "user"])
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const total_count = await NotesModel.count();
    return {
      notes,
      meta: {
        page_limit: limit,
        current_page: page,
        total_count,
      },
    };
  }

  public async updateNote(
    categoryId: string,
    categoryData: Notes
  ): Promise<Notes> {
    const updateCategoryById: Notes = await NotesModel.findByIdAndUpdate(
      categoryId,
      { ...categoryData },
      { new: true }
    );
    if (!updateCategoryById)
      throw new HttpException(409, "Category doesn't exist");
    return updateCategoryById;
  }
  public async deleteNotes(categoryId: string): Promise<Notes> {
    const deleteNotesById: Notes = await NotesModel.findByIdAndDelete(
      categoryId
    );
    if (!deleteNotesById)
      throw new HttpException(409, "Category doesn't exist");
    return deleteNotesById;
  }
}
