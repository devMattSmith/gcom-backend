import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { UserSubscriptionService } from '@/services/userSubscription.service';
import { QUERY_PARAMS } from '@/utils/utils';
import { NextFunction, Response } from 'express';
import Container from 'typedi';

export class UserSubscriptionController {
  public userSubscription = Container.get(UserSubscriptionService);

  public createSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const subscription = await this.userSubscription.create(req.body);

      return res.status(200).json({ success: true, subscription });
    } catch (err) {
      next(err);
    }
  };

  public findAllUserSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }
      const userSubscription = await this.userSubscription.findAll(req.params.id, QUERY_PARAMS(req.query), page);
      res.status(200).json(userSubscription);
    } catch (err) {
      next(err);
    }
  };

  public findAll = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      let query_page: any = req.query.page;
      let page: any = 1;

      if (query_page) {
        page = parseInt(query_page);
      }
      const userSubscription = await this.userSubscription.findAll(undefined, QUERY_PARAMS(req.query), page);
      res.status(200).json(userSubscription);
    } catch (err) {
      next(err);
    }
  };

  public findOneUserSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const subscription = await this.userSubscription.findById(req.params.id);
      if (!subscription) {
        throw new HttpException(400, 'Invalid Subscription');
      }
      return res.status(200).json({ success: true, subscription });
    } catch (err) {
      next(err);
    }
  };

  public cancelSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const subscription = await this.userSubscription.cancelSubscription(req.params.id);
      return res.status(200).json({ success: true, subscription });
    } catch (err) {
      next(err);
    }
  };
}
