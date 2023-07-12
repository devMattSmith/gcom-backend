import { HttpException } from '@/exceptions/httpException';
import { NotificationDto, UpdateNotification } from '@interfaces/notification.interface';
import { NotificationModel } from '@models/notification.model';
import aqp from 'api-query-params';
import { Service } from 'typedi';

@Service()
export class NotificationService {
  public async getAll(params: any, page, userId = null) {
    const { filter, limit, skip, sort } = <any>aqp(params);

    if (userId) {
      filter['userId'] = userId
    }

    const notifications = await NotificationModel.find(filter).populate(['userId', 'courseId']).sort(sort).skip(skip).limit(limit);
    const total_count = await NotificationModel.count();

    return {
      notifications,
      meta: {
        page_limit: limit,
        current_page: page,
        total_count,
      },
    };
  }

  public async createNotification(payload: NotificationDto) {
    const notification = await NotificationModel.create(payload);
    return await this.getById(notification._id);
  }

  public async updateNotification(id: string, payload: UpdateNotification) {
    await this.getById(id);
    return await NotificationModel.findByIdAndUpdate(id, payload, { new: true });
  }

  public async getById(id: string) {
    try {
      const notification = await NotificationModel.findById(id).populate(['userId', 'courseId']);
      if (!notification) {
        throw new HttpException(400, 'Invalid Notification');
      }
      return notification;
    } catch (err) {
      throw new HttpException(400, err);
    }
  }

  public async delete(id: string) {
    await this.getById(id);
    return await NotificationModel.findByIdAndDelete(id);
  }
}
