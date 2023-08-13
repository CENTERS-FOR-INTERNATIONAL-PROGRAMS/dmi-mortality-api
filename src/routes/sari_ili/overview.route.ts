import { Router } from 'express';
import OverviewController from '../../controllers/sari_ili/overview.controller';
import * as RoutesData from '../../data/sari_ili/routes.json';

class OverviewRoutes {
    router = Router();
    controller = new OverviewController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        RoutesData.routes.forEach(routeInstance => {
            this.router.get(routeInstance.url, this.controller.getData);
        });
    }
}

export default new OverviewRoutes().router;