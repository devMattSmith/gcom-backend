import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { MyList } from "@interfaces/myList.interfaces";
import { MyListModel } from "@models/myList.model";
import { UserModel } from "@models/users.model";
import { Types } from "mongoose";
@Service()
export class MyListService {
  public async findAllMyList(userId: string): Promise<MyList[]> {
    const mylist: MyList[] = await MyListModel.aggregate([
      {
        $match: { userId: new Types.ObjectId(userId) },
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
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          courses: { $push: "$course" },
        },
      },
    ]);
    return mylist;
  }
  public async addCourseMyList(myListData: any): Promise<MyList> {
    const isuser: any = await UserModel.findOne({ _id: myListData.userId });

    if (isuser.categories.length) {
      isuser.categories = [
        isuser.categories,
        ...myListData.categoryId.map((s) => new Types.ObjectId(s)),
      ];
    } else {
      isuser.categories = [
        ...myListData.categoryId.map((s) => new Types.ObjectId(s)),
      ];
    }
    const updaet: any = await UserModel.findByIdAndUpdate(
      { _id: isuser._id },
      {
        categories: Object.values(
          isuser.categories.reduce(
            (acc, cur) => Object.assign(acc, { [cur.toString()]: cur }),
            {}
          )
        ),
      },
      { new: true }
    );
    //  console.log(isuser.categoryIds);
    const updateMyListById: MyList = await MyListModel.findByIdAndUpdate(
      { _id: myListData.mylistId },
      { $push: { courseId: { $each: myListData.courseId } } },
      { new: true }
    );
    if (!updateMyListById) throw new HttpException(409, "list doesn't exist");
    return updateMyListById;
  }
  public async removeCourse(myListData: MyList): Promise<MyList> {
    const createMyListData: MyList = await MyListModel.findByIdAndUpdate(
      { _id: myListData.mylistId },
      {
        $pull: { courseId: myListData.courseId },
      },
      { new: true }
    );
    return createMyListData;
  }
  public async createMyList(myListData: MyList): Promise<MyList> {
    const createMyList: MyList = await MyListModel.create({
      ...myListData,
    });

    return createMyList;
  }
  public async updateMyList(
    myListId: string,
    myListData: MyList
  ): Promise<MyList> {
    const updateMyListById: MyList = await MyListModel.findByIdAndUpdate(
      myListId,
      {
        ...myListData,
      },
      { new: true }
    );
    if (!updateMyListById) throw new HttpException(409, "MyList doesn't exist");

    return updateMyListById;
  }
  public async deleteMyList(userId: string): Promise<MyList> {
    const deleteMyListById: MyList = await MyListModel.findByIdAndDelete(
      userId
    );
    if (!deleteMyListById) throw new HttpException(409, "mylist doesn't exist");

    return deleteMyListById;
  }
}
