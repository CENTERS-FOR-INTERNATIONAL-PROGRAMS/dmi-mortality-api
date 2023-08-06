import { Router } from 'express';
import ResultsController from '../controllers/results.controller';

class ResultsRoutes {
    router = Router();
    controller = new ResultsController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/findCovid19ResultsByStatus", this.controller.findCovi19ResultsByStatus);
        this.router.get("/findCovid19ResultsByFacility", this.controller.findCovi19ResultsByFacility);
    }
}
export default new ResultsRoutes().router;