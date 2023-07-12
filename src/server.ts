import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { PagesRoute } from '@routes/pages.route';
import { CategoryRoute } from '@routes/category.route';
import { TicketRoute } from '@/routes/ticket.route';
import { ReviewRoute } from '@routes/reviews.route';
import { RoleRoute } from '@routes/role.route';
import { CountryRoute } from '@routes/country.route';
import { CommentRoute } from '@routes/comment.route';
import { ValidateEnv } from '@utils/validateEnv';
import { CourseRoute } from './routes/course.route';
import { WishListRoute } from './routes/wishList.route';
import { MyListRoute } from './routes/myList.route';
import { SubscriptionRoute } from './routes/subscription.route';
import { NotesRoute } from './routes/notes.route';
import { MemberStories } from './routes/memberStories.route';
import { PurchaseHistory } from './routes/purchaseHistory.route';
import { UserActivityRoute } from './routes/userActivity.route';
import { LoginActivityRoute } from './routes/loginActivity.route';
import { UserSubscriptionRoute } from './routes/userSubscription.route';
import { NotificationRoutes } from './routes/notification.route';
import { DashboardRoute } from './routes/dashboard.route';
ValidateEnv();

const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new PagesRoute(),
  new CategoryRoute(),
  new TicketRoute(),
  new ReviewRoute(),
  new RoleRoute(),
  new CountryRoute(),
  new CourseRoute(),
  new CommentRoute(),
  new WishListRoute(),
  new MyListRoute(),
  new SubscriptionRoute(),
  new NotesRoute(),
  new MemberStories(),
  new PurchaseHistory(),
  new UserActivityRoute(),
  new LoginActivityRoute(),
  new UserSubscriptionRoute(),
  new NotificationRoutes(),
  new DashboardRoute()
]);

app.listen();
