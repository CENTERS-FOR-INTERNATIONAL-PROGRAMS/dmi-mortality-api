import { Router } from 'express';
import ScreeningController from '../controllers/screening.controller';

class ScreeningRoutes {
    router = Router();
    controller = new ScreeningController();
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/findScreeningByGender", this.controller.findScreeningByGender);
        this.router.get("/findScreeningByAgeGender", this.controller.findScreeningByAgeGender);
    }
}
export default new ScreeningRoutes().router;