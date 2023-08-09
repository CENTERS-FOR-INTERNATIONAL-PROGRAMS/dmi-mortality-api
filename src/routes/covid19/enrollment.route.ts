import { Router } from 'express';
import EnrollmentController from '../../controllers/covid19/enrollment.controller';

class EnrollmentRoutes {
    router = Router();
    controller = new EnrollmentController();
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/findByGender", this.controller.findByGender);
        this.router.get("/findByAgeGender", this.controller.findByAgeGender);
        this.router.get("/findByFacility", this.controller.findByFacility);
        this.router.get("/findOverTime", this.controller.findOverTime);
    }
}

export default new EnrollmentRoutes().router;