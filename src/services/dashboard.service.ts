import { Service } from 'typedi';
import { Container } from 'typedi';
import { PurchaseHistorys } from './purchaseHistory.service';
import { UserSubscriptionService } from './userSubscription.service';
import moment from 'moment';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class DashboardService {
  public purchaseHistoryservice = Container.get(PurchaseHistorys);
  public usersubscription = Container.get(UserSubscriptionService);

  public async getDashboardStats(startDate, endDate) {
    try {
      const start_date = moment(startDate);
      const end_date = moment(endDate);

      if (start_date > end_date) {
        throw new HttpException(400, 'start date not greater then end date');
      }

      const current_aggregate = [
        {
          $match: {
            createdAt: {
              $gte: start_date.toDate(),
              $lt: end_date.toDate(),
            },
          },
        },
        {
          $group: {
            _id: '',
            count: {
              $sum: '$totalPrice',
            },
          },
        },
      ];

      const current_aggregation_response = await this.purchaseHistoryservice.getAggregate(current_aggregate);

      const current_aggregation_result = current_aggregation_response[0]?.count || 0;

      //  ------------------------------- total revenue end  ------------------------------

      //  ------------------------------- course purchased start  ------------------------------

      const current_purchase = await this.purchaseHistoryservice.totalPurchasedCourse({
        createdAt: { $gte: start_date.startOf('day').toDate(), $lt: end_date.endOf('day').toDate() },
      });
        
        
        //  ----------------------------- active subscription ------------------------------ 

       const current_active_subscriber = [
         {
           $match: {
             status: true,
           },
         },
         {
           $match: {
             createdAt: {
               $gte: start_date.startOf('day').toDate(),
               $lt: end_date.endOf('day').toDate(),
             },
           },
         },
         {
           $group: {
             _id: {
               user: '$user',
             },
           },
         },
         {
           $count: 'count',
         },
       ];

        const current_active_subscriber_response = await this.usersubscription.getAggregate(current_active_subscriber);
        const current_active_subscriber_result = current_active_subscriber_response[0]?.count || 0;

        
      // -----------------------------------before -------------------------------
      const before_start = start_date.subtract(1, 'month').toDate();

      const before_end = end_date.subtract(1, 'month').toDate();

      const before_aggregation = [
        {
          $match: {
            createdAt: {
              $gte: before_start,
              $lt: before_end,
            },
          },
        },
        {
          $group: {
            _id: '',
            count: {
              $sum: '$totalPrice',
            },
          },
        },
      ];

      const before_aggregation_response = await this.purchaseHistoryservice.getAggregate(before_aggregation);
      const before_aggregation_result = before_aggregation_response[0]?.count || 0;

        // ----------------------------------------- reveneue end end ------------------------
      const before_purchase = await this.purchaseHistoryservice.totalPurchasedCourse({
        createdAt: { $gte: before_start, $lt: before_end },
      });
        // ----------------------------------- purchase end ---------------------

        const before_active_subscriber = [
          {
            $match: {
              status: true,
            },
          },
          {
            $match: {
              createdAt: {
                $gte: before_start,
                $lt: before_end,
              },
            },
          },
          {
            $group: {
              _id: {
                user: '$user',
              },
            },
          },
          {
            $count: 'count',
          },
        ];

        const before_active_subscriber_response = await this.usersubscription.getAggregate(before_active_subscriber);

        const before_active_subscriber_result = before_active_subscriber_response[0]?.count || 0;

        



        
      const total_revenue = {
        current: current_aggregation_result,
        before: before_aggregation_result,
        is_higher: current_aggregation_result > before_aggregation_result ? true : false
      };
      const total_purchase = {
        current: current_purchase.length,
        before: before_purchase.length,
        is_higher: current_purchase.length > before_purchase.length ? true : false
      };
        
        const active_subscriber = {
          current: current_active_subscriber_result,
          before: before_active_subscriber_result,
          is_higher: current_active_subscriber_result > before_active_subscriber_result ? true : false
        };

      return { total_revenue, total_purchase, active_subscriber };
    } catch (err) {
      throw new HttpException(400, err.message || err);
    }
  }
}
