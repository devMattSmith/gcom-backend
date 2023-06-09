import { hash, compare } from "bcrypt";
import { Service } from "typedi";
import { HttpException } from "@exceptions/httpException";
import { User } from "@interfaces/users.interface";
import { UserModel } from "@models/users.model";
import { Types } from "mongoose";
import { CourseViewHistoryModel } from "@/models/courseViewHistory.model";
import { CourseViewHistory } from "@/interfaces/courseViewHistory.interfaces";
@Service()
export class UserService {
  public async findAllUser(
    search: string,
    skip: number,
    limit: number,
    status: string,
    startDate: string,
    endDate: string
  ): Promise<User[]> {
    var conditions = {};
    var and_clauses = [];
    if (status !== "") {
      and_clauses.push({
        status: status,
      });
    }
    and_clauses.push({
      role: 1,
    });
    if (startDate && startDate != "" && endDate && endDate != "") {
      and_clauses.push({
        createdAt: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      });
    }
    if (search && search != "") {
      and_clauses.push({
        $or: [
          {
            name: {
              $regex: "^" + search,
              $options: "i",
            },
          },
          {
            email: {
              $regex: "^" + search,
              $options: "i",
            },
          },
          {
            phoneNumber: {
              $regex: "^" + search,
              $options: "i",
            },
          },
        ],
      });
    }

    conditions["$and"] = and_clauses;
    const users: User[] = await UserModel.aggregate([
      {
        $match: conditions,
      },
      {
        $lookup: {
          from: "Country",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $unwind: { path: "$country", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          phoneNumber: { $first: "$phoneNumber" },
          status: { $first: "$status" },
          city: { $first: "$city" },
          state: { $first: "$state" },
          thumbnail: { $first: "$thumbnail" },
          country: { $first: "$country.name" },
          createdAt: { $first: "$createdAt" },
        },
      },
      { $sort: { createdAt: -1 } },
      // { $limit: limit },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: "total" }],
        },
      },
    ]);

    return users;
  }
  public async countAllUser(): Promise<number> {
    const users: number = await UserModel.count();
    return users;
  }

  // public async userExists(email: any): Promise<any> {
  //   const users: any = await UserModel.findOne({ email });
  //   if (!users) throw new HttpException(409, "email doesn't exist");

  //   return users;
  // }
  public async findUserById(userId: string): Promise<any> {
    // const findUser: User = await UserModel.findOne({ _id: userId });
    const findUser: User[] = await UserModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "Courses",
          localField: "courses",
          foreignField: "_id",
          pipeline: [{ $match: { isDeleted: false } }],
          as: "courses",
        },
      },
      {
        $unwind: { path: "$courses", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Subscriptions",
          localField: "subscriptions",
          foreignField: "_id",
          as: "subscriptions",
        },
      },
      {
        $unwind: { path: "$subscriptions", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Country",
          localField: "country",
          foreignField: "_id",
          as: "country",
        },
      },
      {
        $unwind: { path: "$country", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          phoneNumber: { $first: "$phoneNumber" },
          status: { $first: "$status" },
          intrest: { $first: "$intrest" },
          about: { $first: "$about" },
          city: { $first: "$city" },
          state: { $first: "$state" },
          thumbnail: { $first: "$thumbnail" },
          country: { $first: "$country.name" },
          createdAt: { $first: "$createdAt" },
          subscriptions: { $push: "$subscriptions" },
          courses: { $push: "$courses" },
        },
      },
    ]);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async updateUser(userId: string, userData: any): Promise<User> {
    if (userData.email) {
      const findUser: User = await UserModel.findOne({ email: userData.email });
      if (findUser && findUser._id != userId)
        throw new HttpException(
          409,
          `This email ${userData.email} already exists`
        );
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...userData,
      },
      { new: true }
    );
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }
  public async updatePassword(userId: string, userData: any): Promise<any> {
    const userDetails: any = await UserModel.findOne({
      _id: userId,
    });
    if (!userDetails) throw new HttpException(409, "User doesn't exist");

    const isPasswordMatching: boolean = await compare(
      userData.currentPassword,
      userDetails.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, "Password is not matching");
    const hashedPassword = await hash(userData.newPassword, 10);
    const updateUserById: User = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return updateUserById;
  }

  public async getViwedCourses(userId: string): Promise<any> {
    const findUser: any[] = await CourseViewHistoryModel.aggregate([
      {
        $match: { userId: new Types.ObjectId(userId) },
      },
      // {
      //   $lookup: {
      //     from: "Courses",
      //     localField: "courseId",
      //     foreignField: "_id",
      //     as: "courses",
      //   },
      // },
      // {
      //   $unwind: { path: "$courses", preserveNullAndEmptyArrays: true },
      // },

      // {
      //   $group: {
      //     _id: "$userId",
      //     courses: { $push: "$courses" },
      //   },
      // },
      {
        $lookup: {
          from: "Courses",
          localField: "courseId",
          foreignField: "_id",
          pipeline: [{ $match: { isDeleted: false } }],
          as: "courseDetails",
        },
      },
      {
        $unwind: { path: "$courseDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Category",
          localField: "courseDetails.category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: { path: "$category", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "Users",
          localField: "courseDetails.generalInfo.instructorName",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          _id: 1,
          course_name: "$courseDetails.course_name",
          author: "$user.name",
          category: "$category.name",
          published: "$createdAt",
          bannerImage: "$courseDetails.bannerImage",
          thumbnail: "$courseDetails.thumbnail",
        },
      },
    ]);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
