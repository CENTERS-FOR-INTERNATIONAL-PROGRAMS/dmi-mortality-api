import { Router } from 'express';
import OverviewController from '../controllers/overview.controller';
class OverviewRoutes {
    router = Router();
    controller = new OverviewController();
    constructor() {
        this.intializeRoutes();
    }
    ///checking with leaon
    intializeRoutes() {
        this.router.get("/findNumberEnrolledByFacility", this.controller.findNumberEnrolledByFacility);
        this.router.get("/findCovid19ByAgeSex", this.controller.findCovid19ByAgeSex);
        this.router.get("/findCovid19OverTime", this.controller.findCovid19OverTime);
        this.router.get("/findCovidPositivity", this.controller.findCovid19Positivity);
        this.router.get("/findCovid19PositivityByAgeGender", this.controller.findCovid19PositivityByAgeGender);
    }
}
export default new OverviewRoutes().router;