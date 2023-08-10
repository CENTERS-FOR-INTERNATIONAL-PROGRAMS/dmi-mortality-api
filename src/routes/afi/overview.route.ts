import { Router } from 'express';
import ResultsController from '../../controllers/afi/overview.controller';

class OverviewRoutes {
    router = Router();
    controller = new ResultsController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/findSummary", this.controller.findSummary);
        this.router.get("/findByGender", this.controller.findSummary);
        this.router.get("/findByAgeGender", this.controller.findSummary);
        this.router.get("/findOverTime", this.controller.findSummary);
        this.router.get("/findRDTMalaria", this.controller.findSummary);
        this.router.get("/findRDTLeptospirosis", this.controller.findSummary);
        this.router.get("/findPCR", this.controller.findSummary);
        this.router.get("/findPriorityIDSR", this.controller.findSummary);
        this.router.get("/findMonthlyIDSR", this.controller.findSummary);
        this.router.get("/findSARSCOV2", this.controller.findSummary);
    }
}
export default new OverviewRoutes().router;