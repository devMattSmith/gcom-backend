import { ILoginActivity, LoginActiviyModel } from '@/models/loginactivity.model';
import aqp from 'api-query-params';
import { Service } from 'typedi';

@Service()
export class LoginActivity {
  public async create(payload: ILoginActivity) {
    return await LoginActiviyModel.create(payload);
  }

  public async getLoginActivity(userid, params: any, page) {
    const { filter, limit, skip, sort } = <any>aqp(params);
    const loginActivity = await LoginActiviyModel.find({ user: userid, ...filter })
      .populate('user')
      .sort(sort)
      .limit(limit)
      .skip(skip);
    const total_count = await LoginActiviyModel.find({ userId: userid, ...filter }).count();

    return {
      loginActivity,
      meta: {
        page_limit: limit,
        current_page: page,
        total_count,
      },
    };
  }
}
