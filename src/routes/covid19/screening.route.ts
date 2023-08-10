import { Router } from 'express';
import ScreeningController from '../../controllers/covid19/screening.controller';

class ScreeningRoutes {
    router = Router();
    controller = new ScreeningController();
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/findCascade", this.controller.findCascade);
    }
}

export default new ScreeningRoutes().router;