import { Application } from "express";

import homeRoutes from "./home.routes";
import overviewRoutes from "./overview.routes";
import screeningRoutes from "./screening.route";

import covid19ScreeningRoutes from "./covid19/screening.route";
import covid19EnrolmentRoutes from "./covid19/enrollment.route";
import covid19ResultsRoutes from "./covid19/results.route";

import SARILIOverviewRoutes from "./sari_ili/overview.route";
import AFIOverviewRoutes from "./afi/overview.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/overview", overviewRoutes);
    app.use("/api/screening", screeningRoutes);

    app.use("/api/covid19/screening", covid19ScreeningRoutes);
    app.use("/api/covid19/enrolment", covid19EnrolmentRoutes);
    app.use("/api/covid19/results", covid19ResultsRoutes);

    app.use("/api/sari_ili/overview", SARILIOverviewRoutes);
    app.use("/api/afi/overview", AFIOverviewRoutes);
  }
}
