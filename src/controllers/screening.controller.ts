
import { Request, Response } from "express";
import screenigRepository from "../repositories/screening.repository"

export default class ScreeningController {
    async findScreeningByGender(req: Request, res: Response) {
        try {
            const numScreenedByGender = await screenigRepository.retrieveScreeningByGender();
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
            const numScreenedByAgeGender = await screenigRepository.retrieveScreeningByAgeGender();
            res.status(201).send(numScreenedByAgeGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numScreenedByAgeGender"
            });
        }
    }
}