import { Request, Response } from "express";
import overviewRepository from "../../repositories/sari_ili/overview.repository";

export default class OverviewController {
    async getData(req: Request, res: Response) {
        try {
            let dataInstance: any;
            dataInstance = await overviewRepository.readData(req.url);
            res.status(200).send(dataInstance);
        }
        catch (err) {
            res.status(500).send({
                message: "An error has occured here --> " + req.url
            });
        }
    }
}