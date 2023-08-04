import { Router } from 'express';
import EnrollmentController from '../controllers/enrollment.controller';

class EnrollmentRoutes {
    router = Router();
    controller = new EnrollmentController();
    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get("/findEnrollmentByGender", this.controller.findEnrollmentByGender);
        this.router.get("/findEnrollmentByAgeGender", this.controller.findEnrollmentByAgeGender);
        this.router.get("/findEnrollmentByFacility", this.controller.findEnrollmentByFacility);
        this.router.get("/findEnrollmentByEpiWeek", this.controller.findEnrollmentByEpiWeek);
    }
}
export default new EnrollmentRoutes().router;