import { Application } from "express";

import homeRoutes from "./home.routes";
import overviewRoutes from "./overview.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);

    app.use("/api/overview",overviewRoutes);
  }
}
