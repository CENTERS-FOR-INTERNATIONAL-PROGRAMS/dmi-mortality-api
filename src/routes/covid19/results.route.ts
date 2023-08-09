import { Router } from 'express';
import ResultsController from '../../controllers/covid19/results.controller';

class ResultsRoutes {
    router = Router();
    controller = new ResultsController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/findByStatus", this.controller.findByStatus);
        this.router.get("/findByFacility", this.controller.findByFacility);
        this.router.get("/findByAgeGender", this.controller.findByAgeGender);
        this.router.get("/findByPositivityOverTime", this.controller.findByPositivityOverTime);
    }
}
export default new ResultsRoutes().router;