import { Router } from 'express';
import OverviewController from '../controllers/overview.controller';
class OverviewRoutes {
    router = Router();
    controller = new OverviewController();
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {

        this.router.get("/findNumberEnrolled", this.controller.findNumberEnrolled);
        this.router.get("/findCovid19ByAgeSex", this.controller.findCovid19ByAgeSex);
        this.router.get("/findCovid19OverTime", this.controller.findCovid19OverTime);
        this.router.get("/findCovidPositivity", this.controller.findCovid19Positivity);
    }
}
export default new OverviewRoutes().router;