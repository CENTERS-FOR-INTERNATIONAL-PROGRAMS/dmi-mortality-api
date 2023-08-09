import { Request, Response } from "express";
import resultsRepository from "../../repositories/covid19/results.repository"

export default class ResultsController {
    async findByStatus(req: Request, res: Response) {
        try {
            const numCovid19ResultsByStatus = await resultsRepository.retrieveByStatus();
            res.status(201).send(numCovid19ResultsByStatus);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numCovid19ResultsByStatus"
            });
        }
    }

    async findByFacility(req: Request, res: Response) {
        try {
            const numCovid19ResultsByFacility = await resultsRepository.retrieveByFacility();
            res.status(201).send(numCovid19ResultsByFacility);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numCovid19ResultsByFacility"
            });
        }
    }

    async findByAgeGender(req: Request, res: Response) {
        try {
            const numCovid19ResultsByAgeGender = await resultsRepository.retrieveByAgeGender();
            res.status(201).send(numCovid19ResultsByAgeGender);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numCovid19ResultsByAgeGender"
            });
        }
    }

    async findByPositivityOverTime(req: Request, res: Response) {
        try {
            const numCovid19ResultsByPositivityOverTime = await resultsRepository.retrieveByPositivityOverTime();
            res.status(201).send(numCovid19ResultsByPositivityOverTime);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving numCovid19ResultsByPositivityOverTime"
            });
        }
    }
}