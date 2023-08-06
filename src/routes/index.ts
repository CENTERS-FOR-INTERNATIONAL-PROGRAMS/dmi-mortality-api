import { Application } from "express";

import homeRoutes from "./home.routes";
import overviewRoutes from "./overview.routes";
import screeningRoutes from "./screening.route";
import enrollmentRoutes from "./enrollment.route";
import resultsRoutes from "./results.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/overview", overviewRoutes);
    app.use("/api/screening", screeningRoutes);
    app.use("/api/enrollment", enrollmentRoutes);
    app.use("/api/results",  resultsRoutes);
  }
}
