import Container from "typedi";
import { CourseService } from "../services/course.service";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { NextFunction, Response } from "express";
import { DATATABLE, COMMUNICATION_KEY_ID, COMMUNICATION_KEY } from "@config";
import moment from "moment";
import { sign } from "jsonwebtoken";
import { logger } from "@/utils/logger";
export class CourseController {
  public courserService = Container.get(CourseService);
  // public getDiffDate = async (startDate) => {
  //   console.log(startDate);
  // };
  public percentage = async (pastMonth, thisMonth) => {
    return ((thisMonth - pastMonth) / thisMonth) * 100;
  };
  public getAllCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let { skip, limit, search, status, category } = req.body;

      skip = skip ? Number(skip) : DATATABLE.skip;
      limit = limit ? Number(limit) : DATATABLE.limit;
      const courses = await this.courserService.findAllCourses(
        skip,
        limit,
        status,
        search,
        category
      );
      res.status(200).json({ data: courses, message: "findAll" });
    } catch (err) {
      next(err);
    }
  };

  public getCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const courses = await this.courserService.findCourseById(courseId);
      res.status(200).json({ data: courses, message: "findOne" });
    } catch (err) {
      next(err);
    }
  };

  public featuredCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const courseId: string = req.params.id;
      const courses = await this.courserService.featuredCourse();
      res.status(200).json({ data: courses, message: "findOne" });
    } catch (err) {
      next(err);
    }
  };
  public createCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.createCourse(req.body);
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };
  public addCourseProgress = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.addCourseProgress(req.body);
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };

  public updateCourseProgress = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.updateCourseProgress(req.body);
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };

  public completeCourseProgress = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.completeCourseProgress(
        req.body
      );
      res.status(200).json({ data: courses, message: "created" });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  };

  public getCourseProgress = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.getCourseProgress(req.body);
      res.status(201).json({ data: courses, message: "get all" });
    } catch (err) {
      next(err);
    }
  };

  public createCourseModule = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.createCourseModule(req.body);
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };
  public addCourseRating = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.addCourseRating(req.body);
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };
  public getRecentViewVideos = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.getRecentViewVideos(req.body);
      res.status(201).json({ data: courses, message: "get all" });
    } catch (err) {
      next(err);
    }
  };
  public mostViewedCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.mostViewedCourse();
      res.status(201).json({ data: courses, message: "get all" });
    } catch (err) {
      next(err);
    }
  };
  public sellingCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filterData = req.body;
      const courses = await this.courserService.sellingCourse(
        filterData.startDate,
        filterData.endDate
      );
      const middleIndex = Math.ceil(courses.length / 2);
      const best = courses.splice(0, middleIndex);
      const least = courses.splice(-middleIndex);
      res.status(201).json({
        data: [{ bestSellingCourse: best }, { leastSellingCourse: least }],
        message: "get all",
      });
    } catch (err) {
      next(err);
    }
  };

  public dashViewedCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filterData = req.body;
      const courses = await this.courserService.dashViewedCourse(
        filterData.startDate,
        filterData.endDate
      );
      const middleIndex = Math.ceil(courses.length / 2);
      const best = courses.splice(0, middleIndex);
      const least = courses.splice(-middleIndex);
      res.status(201).json({
        data: [{ mostViewedCourse: best }, { leastViewedCourse: least }],
        message: "get all",
      });
    } catch (err) {
      next(err);
    }
  };
  public dashRatingCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filterData = req.body;
      const courses = await this.courserService.dashRatingCourse(
        filterData.startDate,
        filterData.endDate
      );
      const middleIndex = Math.ceil(courses.length / 2);
      const best = courses.splice(0, middleIndex);
      const least = courses.splice(-middleIndex);
      res.status(201).json({
        data: [{ mostRatedCourse: best }, { leastRatedCourse: least }],
        message: "get all",
      });
    } catch (err) {
      next(err);
    }
  };
  public courseCount = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const filterData = req.body;

      var Difference_In_Time =
        new Date(filterData.startDate).getTime() -
        new Date(filterData.endDate).getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      let pastDate = moment(filterData.startDate)
        .subtract(Difference_In_Days, "days")
        .format("YYYY-MM-DD");

      const totalCoursesCount = await this.courserService.totalCoursesCount();
      const newCoursCount = await this.courserService.newCoursCount(
        filterData.startDate,
        filterData.endDate
      );
      const pastNewCoursCount = await this.courserService.newCoursCount(
        pastDate,
        filterData.startDate
      );
      const ratingCount = await this.courserService.ratingCount(
        filterData.startDate,
        filterData.endDate
      );
      const pastRatingCount = await this.courserService.ratingCount(
        pastDate,
        filterData.endDate
      );

      const purchaseCount = await this.courserService.purchaseCount(
        filterData.startDate,
        filterData.endDate
      );
      const pastPurchaseCount = await this.courserService.purchaseCount(
        pastDate,
        filterData.endDate
      );
      console.log(pastRatingCount, "pastRatingCount", ratingCount);
      console.log(pastPurchaseCount, "pastPurchaseCount", purchaseCount);
      let perNewCourse = await this.percentage(
        pastNewCoursCount,
        newCoursCount
      );
      let perRatingCount = await this.percentage(pastRatingCount, ratingCount);
      let perPurchaseCount = await this.percentage(
        pastPurchaseCount,
        purchaseCount
      );

      let coutObject = {
        totalCoursesCount,
        newCoursCount,
        perNewCourse: isNaN(perNewCourse)
          ? 0
          : parseFloat(perNewCourse.toFixed(1)),
        ratingCount,
        perRatingCount: isNaN(perRatingCount)
          ? 0
          : parseFloat(perRatingCount.toFixed(1)),
        purchaseCount,
        perPurchaseCount: isNaN(perPurchaseCount)
          ? 0
          : parseFloat(perPurchaseCount.toFixed(1)),
      };

      res.status(201).json({
        data: coutObject,
        message: "get count",
      });
    } catch (err) {
      next(err);
    }
  };

  public leastViewedCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courses = await this.courserService.leastViewedCourse();
      res.status(201).json({ data: courses, message: "get all" });
    } catch (err) {
      next(err);
    }
  };

  public getVideoToken = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let now = moment();
      let validFrom = now.clone().subtract(1, "days");
      let validTo = now.clone().add(1, "days");
      const keyData = req.body;

      let communicationKeyAsBuffer = Buffer.from(COMMUNICATION_KEY, "base64");
      let message = {
        type: "entitlement_message",
        version: 2,
        license: {
          duration: 3600,
        },
        content_keys_source: {
          inline: [
            {
              id: keyData.keyId,
            },
          ],
        },
      };
      let envelope = {
        version: 1,
        com_key_id: COMMUNICATION_KEY_ID,
        message: message,
        begin_date: validFrom.toISOString(),
        expiration_date: validTo.toISOString(),
      };
      let licenseToken = sign(envelope, communicationKeyAsBuffer, {
        algorithm: "HS256",
        noTimestamp: true,
      });

      // const courses = await this.courserService.createCourseModule(req.body);
      res.status(201).json({ data: licenseToken, message: "created" });
    } catch (err) {
      next(err);
    }
  };
  public addChapter = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const body = req.body;
      const courses = await this.courserService.addModuleChapter(
        courseId,
        body
      );
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };
  public removeChapter = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const body = req.body;
      const courses = await this.courserService.removeModuleChapter(
        courseId,
        body
      );
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };
  public getRecommendedCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      // const body = req.body;
      const courses = await this.courserService.getRecommendedCourse(courseId);
      res.status(201).json({ data: courses, message: "get courses" });
    } catch (err) {
      next(err);
    }
  };
  public viewCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const { userId } = req.body;

      const courses = await this.courserService.viewCourse(courseId, userId);
      res.status(200).json({ data: courses, message: "findOne" });
    } catch (err) {
      next(err);
    }
  };

  public updateChapter = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const body = req.body;
      const courses = await this.courserService.updateModuleChapter(
        courseId,
        body
      );
      res.status(201).json({ data: courses, message: "created" });
    } catch (err) {
      next(err);
    }
  };
  // public coursePurchase = async (
  //   req: RequestWithUser,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const courseId: string = req.params.id;
  //     //const body = req.body;
  //     const courses = await this.courserService.coursePurchase(courseId);
  //     res.status(201).json({ data: courses, message: "created" });
  //   } catch (err) {
  //     next(err);
  //   }
  // };
  public getTopCourses = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // const courseId: string = req.params.id;
      //const body = req.body;
      const courses = await this.courserService.getTopCourses();
      res.status(201).json({ data: courses, message: "get all" });
    } catch (err) {
      next(err);
    }
  };

  public updateModule = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const body = req.body;
      const courses = await this.courserService.updateModule(courseId, body);
      res.status(200).json({ data: courses, message: "updated" });
    } catch (err) {
      next(err);
    }
  };
  public updateCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const body = req.body;
      const courses = await this.courserService.updateCourse(courseId, body);
      res.status(200).json({ data: courses, message: "updated" });
    } catch (err) {
      next(err);
    }
  };

  public deleteCourse = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const courses = await this.courserService.deleteCourse(courseId);
      res.status(200).json(courses);
    } catch (err) {
      next(err);
    }
  };
  public deleteModule = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const courseId: string = req.params.id;
      const courses = await this.courserService.deleteModule(courseId);
      res.status(200).json(courses);
    } catch (err) {
      next(err);
    }
  };
}
