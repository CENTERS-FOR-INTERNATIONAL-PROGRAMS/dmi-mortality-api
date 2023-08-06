import { Request, Response } from "express";
import resultsRepository from "../repositories/results.repository"

export default class ResultsController {
    async findCovi19ResultsByStatus(req: Request, res: Response) {
        try {
            const numCovid19ResultsByStatus = await resultsRepository.retrieveCovi19ResultsByStatus();
            res.status(201).send(numCovid19ResultsByStatus);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numCovid19ResultsByStatus"
            });
        }
    }

    async findCovi19ResultsByFacility(req: Request, res: Response) {
        try {
            const numCovid19ResultsByFacility = await resultsRepository.retrieveCovi19ResultsByFacility();
            res.status(201).send(numCovid19ResultsByFacility);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numCovid19ResultsByFacility"
            });
        }
    }
}