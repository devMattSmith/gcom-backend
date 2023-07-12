import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserActivityService } from '@/services/userActivity.service';
import { QUERY_PARAMS } from '@/utils/utils';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class UserActivityController {
  public userActivity = Container.get(UserActivityService);

  public getUserActivity = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }
      
      const userLoginActivity = await this.userActivity.getUserActivity(req.params.userId, QUERY_PARAMS(req.query), page);
      res.status(200).json(userLoginActivity);
    } catch (err) {
      next(err);
    }
  };
}
