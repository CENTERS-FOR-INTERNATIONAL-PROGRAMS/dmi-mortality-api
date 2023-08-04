import { Application } from "express";

import homeRoutes from "./home.routes";
import overviewRoutes from "./overview.routes";
import screeningRoutes from "./screening.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/overview",overviewRoutes);
    app.use("/api/screening",screeningRoutes);
  }
}
