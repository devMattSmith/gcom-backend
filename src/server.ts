import { App } from "@/app";
import { AuthRoute } from "@routes/auth.route";
import { UserRoute } from "@routes/users.route";
import { PagesRoute } from "@routes/pages.route";
import { CategoryRoute } from "@routes/category.route";
import { HelpSupportRoute } from "@routes/helpSupport.route";
import { ReviewRoute } from "@routes/reviews.route";
import { RoleRoute } from "@routes/role.route";
import { CountryRoute } from "@routes/country.route";
import { ValidateEnv } from "@utils/validateEnv";

ValidateEnv();

const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new PagesRoute(),
  new CategoryRoute(),
  new HelpSupportRoute(),
  new ReviewRoute(),
  new RoleRoute(),
  new CountryRoute(),
]);

app.listen();
