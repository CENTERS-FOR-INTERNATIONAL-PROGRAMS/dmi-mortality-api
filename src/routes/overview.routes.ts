import { Router } from 'express';
import OverviewController from '../controllers/overview.controller';
class OverviewRoutes {
    router = Router();
    controller = new OverviewController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/findCovid19Summary", this.controller.findCovid19Summary);
        this.router.get("/findCovid19SummaryByMonth", this.controller.findCovid19SummaryByMonth);

        this.router.get("/findCovid19ScreeningEnrollmentCascade", this.controller.findCovid19ScreeningEnrollmentCascade);

        this.router.get("/findCovid19ByAgeSex", this.controller.findCovid19ByAgeSex);
        this.router.get("/findCovid19OverTime", this.controller.findCovid19OverTime);
        this.router.get("/findCovid19PositivityByAgeGender", this.controller.findCovid19PositivityByAgeGender);
        this.router.get("/findCovid19Positivity", this.controller.findCovid19Positivity);
        this.router.get("/findCovid19PositivityByGender", this.controller.findCovid19PositivityByGender);
        this.router.get("/findCovid19OverallPositivityByFacility", this.controller.findCovid19OverallPositivityByFacility);
    }
}
export default new OverviewRoutes().router;