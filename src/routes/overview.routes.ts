import { Router } from 'express';
import OverviewController from '../controllers/overview.controller';
class OverviewRoutes {
    router = Router();
    controller = new OverviewController();

    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/", this.controller.findAll);

    }


}

export default new OverviewRoutes().router;