import { RequestWithUser } from '@/interfaces/auth.interface';
import { NotificationService } from '@/services/notification.service';
import { logger } from '@/utils/logger';
import { QUERY_PARAMS } from '@/utils/utils';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class NotificationController {
  public notification = Container.get(NotificationService);

  public getAllNotification = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }
      res.status(200).json({ success: true, ...(await this.notification.getAll(QUERY_PARAMS(req.query), page)) });
    } catch (err) {
      next(err);
    }
  };

  public getUserNotification = async (req: RequestWithUser, res: Response, next: NextFunction) => { 

    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }

      res.status(200).json({ success: true, ...(await this.notification.getAll(QUERY_PARAMS(req.query), page,req.params.id)) });

    } catch (err) {
      logger.error(err)
      next(err)
    }
    
  }

  public getNotificationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ success: true, notification: await this.notification.getById(req.params.id) });
    } catch (err) {
      next(err);
    }
  };

  public updateNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ success: true, notification: await this.notification.updateNotification(req.params.id, req.body) });
    } catch (err) {
      next(err);
    }
  };

  public createNotification = async (req: Request, res: Response, next:NextFunction) => {
    try{
        res.status(200).json({success:true, notification: await this.notification.createNotification(req.body)})
    }catch(err){
        next(err)
    }
  }

  public deleteNotification = async( req: Request, res: Response, next:NextFunction) => {
    try{
        await this.notification.delete(req.params.id)
        res.status(200).json({success:true, message:"notification delete Successfully"})
    }catch(err){
        next(err)
    }
  }
}
