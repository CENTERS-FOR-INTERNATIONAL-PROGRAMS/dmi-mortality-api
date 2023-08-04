import { Request, Response } from "express";
import enrollmentRepository from "../repositories/enrollment.repository"

export default class EnrollmentController {
    async findEnrollmentByGender(req: Request, res: Response) {
        try {
            const numEnrolledByGender = await enrollmentRepository.retrieveEnrollmentByGender();
            res.status(201).send(numEnrolledByGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByGender"
            });
        }
    }

    async findEnrollmentByAgeGender(req: Request, res: Response) {
        try {
            const numEnrolledByAgeGender = await enrollmentRepository.retrieveEnrollmentByAgeGender();
            res.status(201).send(numEnrolledByAgeGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByAgeGender"
            });
        }
    }

    async findEnrollmentByFacility(req: Request, res: Response) {
        try {
            const numEnrolledByFacility = await enrollmentRepository.retrieveEnrollmentByFacility();
            res.status(201).send(numEnrolledByFacility);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByFacility"
            });
        }
    }

    async findEnrollmentByEpiWeek(req: Request, res: Response) {
        try {
            const numEnrolledByEpiWeek = await enrollmentRepository.retrieveEnrollmentByEpiWeek();
            res.status(201).send(numEnrolledByEpiWeek);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledByEpiWeek"
            });
        }
    }
}