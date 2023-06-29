import { RequestWithUser } from '@/interfaces/auth.interface';
import { LoginActivity } from '@/services/loginActivity.service';
import { QUERY_PARAMS } from '@/utils/utils';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class LoginActivityController {
  public loginActivity = Container.get(LoginActivity);

  public getUserLoginActivity = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }
      const userLoginActivity = await this.loginActivity.getLoginActivity(req.user._id, QUERY_PARAMS(req.query), page);
      res.status(200).json(userLoginActivity);
    } catch (err) {
      next(err);
    }
  };
}
