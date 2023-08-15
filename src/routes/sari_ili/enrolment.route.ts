import { Router } from 'express';
import EnrolmentController from '../../controllers/sari_ili/enrolment.controller';
import * as RoutesData from '../../data/sari_ili/routes.json';

class EnrolmentRoutes {
    router = Router();
    controller = new EnrolmentController();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        RoutesData.routes.forEach(routeInstance => {
            this.router.get(routeInstance.url, this.controller.getData);
        });
    }
}

export default new EnrolmentRoutes().router;