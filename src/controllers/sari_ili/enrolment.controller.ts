import { Request, Response } from "express";
import enrolmentRepository from "../../repositories/sari_ili/enrolment.repository";

export default class EnrolmentController {
    async getData(req: Request, res: Response) {
        try {
            let dataInstance: any;
            dataInstance = await enrolmentRepository.readData(req.url);
            res.status(200).send(dataInstance);
        }
        catch (err) {
            res.status(500).send({
                message: "An error has occured here --> " + req.url
            });
        }
    }
}