import { Request, Response } from "express";
import enrollmentRepository from "../../repositories/covid19/enrollment.repository"

export default class EnrollmentController {
    async findByGender(req: Request, res: Response) {
        try {
            const numEnrolledByGender = await enrollmentRepository.retrieveByGender();
            res.status(201).send(numEnrolledByGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByGender"
            });
        }
    }

    async findByAgeGender(req: Request, res: Response) {
        try {
            const numEnrolledByAgeGender = await enrollmentRepository.retrieveByAgeGender();
            res.status(201).send(numEnrolledByAgeGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByAgeGender"
            });
        }
    }

    async findByFacility(req: Request, res: Response) {
        try {
            const numEnrolledByFacility = await enrollmentRepository.retrieveByFacility();
            res.status(201).send(numEnrolledByFacility);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByFacility"
            });
        }
    }

    async findOverTime(req: Request, res: Response) {
        try {
            const numEnrolledByEpiWeek = await enrollmentRepository.retrieveOverTime();
            res.status(201).send(numEnrolledByEpiWeek);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByEpiWeek"
            });
        }
    }
}