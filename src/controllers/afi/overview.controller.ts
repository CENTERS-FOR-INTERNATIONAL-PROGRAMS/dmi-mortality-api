import { Request, Response } from "express";
import overviewRepository from "../../repositories/afi/overview.repository"

export default class OverviewController {
    async findSummary(req: Request, res: Response) {
        try {
            const dataInstance = await overviewRepository.retrieveSummary();
            res.status(201).send(dataInstance);
        }
        catch (err) {
            res.status(500).send({
                message: "Some Error occured while retrieving afi --> summary "
            });
        }
    }
}