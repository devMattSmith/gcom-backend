import { UserSubscriptionDto } from '@/dtos/usersubscription.dto';
import { HttpException } from '@/exceptions/httpException';
import { IUserSubscription } from '@/interfaces/usersubscription.interface';
import { UserSubscriptionModel } from '@/models/userSubscription.model';
import aqp from 'api-query-params';
import moment from 'moment';
import { Service } from 'typedi';
import { PurchaseHistorys } from './purchaseHistory.service';
import { SubscriptionService } from './subscription.service';
import { UserService } from './users.service';

@Service()
export class UserSubscriptionService {
  constructor(public subscriptionService: SubscriptionService, public userService: UserService, public purchasehistory: PurchaseHistorys) {}

  public async create(body: UserSubscriptionDto): Promise<IUserSubscription> {
    const plan = await this.subscriptionService.findById(body.plan);
    if (!plan) {
      throw new HttpException(400, 'Invalid Plan');
    }

    const user = await this.userService.findUserById(body.user);
    if (!user) {
      throw new HttpException(400, 'Invalid User');
    }

    const planType = plan.planType === 1 ? 12 : 1;

    const userSubscription = await this.findOne({ plan: body.plan, user: body.user });

    if (userSubscription) {
      //   if user have already active plan we need to expire it
      await this.update(body);
    }

    const payload = {
      plan: body.plan,
      user: body.user,
      startDate: moment().toDate(),
      endDate: moment().add(planType, 'months').toDate(),
      status: true,
    };

    await this.purchasehistory.createPurchaseHistroy({
      title: plan.title,
      totalPrice: plan.amount,
      userId: body.user,
      paymentType: plan.planType === 1 ? 'MONTHLT' : 'ONETIME',
      planId: plan.id
    },false);
    return await UserSubscriptionModel.create(payload);
  }

  public async findOne(query: any) {
    return await UserSubscriptionModel.findOne(query).populate(['user', 'plan']);
  }

  public async findById(id: string) {
    return await UserSubscriptionModel.findById(id).populate(['user', 'plan']);
  }

  public async getAggregate(aggregation) {
    return await UserSubscriptionModel.aggregate(aggregation)
  }

  public async update(body: UserSubscriptionDto) {
    return await UserSubscriptionModel.updateOne(
      { user: body.user, plan: body.plan },
      { $set: { endDate: new Date(), status: false } },
      { new: true },
    );
  }

  public async cancelSubscription(id: string) {
    const subscription = await this.findById(id);
    if (!subscription) {
      throw new HttpException(400, 'Invalid Subscription');
    }
    return await UserSubscriptionModel.findByIdAndUpdate(id, { $set: { endDate: new Date(), status: false } }, { new: true });
  }

  public async findAll(userid, params: any, page) {
    const { filter, limit, skip, sort } = <any>aqp(params);

    const query = { ...filter };
    if (userid) {
      query['user'] = userid;
    }
    const subscriptions = await UserSubscriptionModel.find(query).populate(['user', 'plan']).sort(sort).limit(limit).skip(skip);

    const total_count = await UserSubscriptionModel.find({ user: userid }).count();
    return {
      subscriptions,
      meta: {
        page_limit: limit,
        current_page: page,
        total_count,
      },
    };
  }
}
