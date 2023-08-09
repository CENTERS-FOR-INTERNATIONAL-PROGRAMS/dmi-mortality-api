import { Application } from "express";

import homeRoutes from "./home.routes";
import overviewRoutes from "./overview.routes";
import screeningRoutes from "./screening.route";

import covid19EnrollmentRoutes from "./covid19/enrollment.route";
import covid19ResultsRoutes from "./covid19/results.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/overview", overviewRoutes);
    app.use("/api/screening", screeningRoutes);

    app.use("/api/covid19/enrollment", covid19EnrollmentRoutes);
    app.use("/api/covid19/results", covid19ResultsRoutes);

    // app.use("/api/afi/results", covid19ResultsRoutes);
    // app.use("/api/sari_ili/results", covid19ResultsRoutes);
  }
}
