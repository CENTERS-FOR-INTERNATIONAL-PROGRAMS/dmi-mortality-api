
import { Request, Response } from "express";
import overviewRepository from "../repositories/overview.repository"

export default class OverviewController {

    async findAll(req: Request, res: Response) {
        try{

            const numEnrolledAndPositive = await overviewRepository.retrieveAll();
            res.status(201).send(numEnrolledAndPositive); 
           
        }
        catch(err) {
            res.status(500).send ({
               message: "Some Error occured while retrieving tutorials"
            });

        }
    }
}

