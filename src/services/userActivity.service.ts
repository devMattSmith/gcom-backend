import { IUserActivitySchema, UserActivityModel } from '@/models/useractivity.model';
import aqp from 'api-query-params';
import { Service } from 'typedi';

@Service()
export class UserActivityService {
  public async getUserActivity(userid, params: any, page) {
    const { filter, limit, skip, sort } = <any>aqp(params);
    const activity = await UserActivityModel.find({ user: userid, ...filter })
      .populate(['user', 'course'])
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const total_count = await UserActivityModel.find({ user: userid, ...filter }).count();

    return {
      activity,
      meta: {
        page_limit: limit,
        current_page: page,
        total_count,
      },
    };
  }

  public async create(payload: IUserActivitySchema) {
    return await UserActivityModel.create(payload);
  }
}
