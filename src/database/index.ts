import { DB_HOST, DB_PORT, DB_DATABASE } from "@config";

export const dbConnection = {
  // url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  url: `mongodb+srv://mahesh0882:3DeoeIHymqKJDa1b@cluster0.p5n1iup.mongodb.net/test`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
