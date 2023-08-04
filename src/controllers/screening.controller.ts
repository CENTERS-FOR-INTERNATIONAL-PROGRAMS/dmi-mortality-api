
import { Request, Response } from "express";
import screeningRepository from "../repositories/screening.repository"

export default class ScreeningController {
    async findScreeningByGender(req: Request, res: Response) {
        try {
            const numScreenedByGender = await screeningRepository.retrieveScreeningByGender();
            res.status(201).send(numScreenedByGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numEnrolledAndPositive"
            });
        }
    }

    async findScreeningByAgeGender(req: Request, res: Response) {
        try {
            const numScreenedByAgeGender = await screeningRepository.retrieveScreeningByAgeGender();
            res.status(201).send(numScreenedByAgeGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving number screened by Age and Gender"
            });
        }
    }

    async findScreeningByHealthFacilities(req: Request, res: Response) {
        try {
            const numScreenedByHealthFacility = await screeningRepository.retrieveScreeningByHealthFacilities();
            res.status(201).send(numScreenedByHealthFacility);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving number screened by Health Facilities"
            });
        }
    }

    async findScreeningOverTime(req: Request, res: Response) {
        try {
            const numScreenedOverTime = await screeningRepository.retrieveScreeningOverTime();
            res.status(201).send(numScreenedOverTime);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving number screened by Health Facilities"
            });
        }
    }
}