import { Request, Response } from "express";
import screeningRepository from "../../repositories/covid19/screening.repository"

export default class ScreeningController {
    async findCascade(req: Request, res: Response) {
        try {
            const numScreenedCascade = await screeningRepository.retrieveCascade();
            res.status(201).send(numScreenedCascade);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving COVID-19 screening cascade"
            });
        }
    }
}