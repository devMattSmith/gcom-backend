import Container from 'typedi';
import { CourseService } from '../services/course.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

export class CourseController {
  public courserService = Container.get(CourseService);

  public getAllCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courses = await this.courserService.findAllCourses();
      res.status(200).json({ data: courses, message: 'findAll' });
    } catch (err) {
      next(err);
    }
  };

  public getCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId: string = req.params.id;
      const courses = await this.courserService.findCourseById(courseId);
      res.status(200).json({ data: courses, message: 'findOne' });
    } catch (err) {
      next(err);
    }
  };

  public createCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courses = await this.courserService.createCourse(req.body);
      res.status(201).json({ data: courses, message: 'created' });
    } catch (err) {
      next(err);
    }
  };

  public updateCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId: string = req.params.id;
      const body = req.body;
      const courses = await this.courserService.updateCourse(courseId, body);
      res.status(200).json({ data: courses, message: 'updated' });
    } catch (err) {
      next(err);
    }
  };

  public deleteCourse = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const courseId: string = req.params.id;
      const courses = await this.courserService.deleteCourse(courseId);
      res.status(200).json(courses);
    } catch (err) {
      next(err);
    }
  };
}
