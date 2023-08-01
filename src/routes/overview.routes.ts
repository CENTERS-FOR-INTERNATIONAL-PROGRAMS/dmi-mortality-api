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

        this.router.get("/findNumberEnrolled", this.controller.findNumberEnrolled);
        this.router.get("/findCovid19ByAgeSex", this.controller.findCovid19ByAgeSex);
        this.router.get("/findCovid19OverTime", this.controller.findCovid19OverTime);

    }
}
export default new OverviewRoutes().router;