import { App } from "@/app";
import { AuthRoute } from "@routes/auth.route";
import { UserRoute } from "@routes/users.route";
import { PagesRoute } from "@routes/pages.route";
import { CategoryRoute } from "@routes/category.route";
import { ValidateEnv } from "@utils/validateEnv";

ValidateEnv();

const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new PagesRoute(),
  new CategoryRoute(),
]);

app.listen();
