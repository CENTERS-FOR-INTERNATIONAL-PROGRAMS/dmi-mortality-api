import { Request, Response } from "express";
import overviewRepository from "../repositories/overview.repository"


export default class OverviewController {

    async findNumberEnrolledByFacility(req: Request, res: Response) {
        try{


            const numEnrolledAndPositive = await overviewRepository.retrieveNumberEnrolledByFacility();



            res.status(201).send(numEnrolledAndPositive); 
           
        }
        catch(err) {
            res.status(500).send ({

               message: "Some Error occured while retrieving numEnrolledAndPositive"
            });

        }
    }
    async findCovid19ByAgeSex(req: Request, res: Response) {
        try{

            const covid19ByAgeSex = await overviewRepository.retrieveCovid19ByAgeSex();
            res.status(201).send(covid19ByAgeSex); 
           
        }
        catch(err) {
            res.status(500).send ({
               message: "Some Error occured while retrieving covid19ByAgeSex"
            });

        }
    }
    async findCovid19OverTime(req: Request, res: Response) {
        try{

           const covid19OverTime = await overviewRepository.retrieveCovid19OverTime();
            res.status(201).send(covid19OverTime); 
           
        }
        catch(err) {
            res.status(500).send ({
               message: "Some Error occured while retrieving covid19OverTime"
            });

        }
    }
    async findCovid19Positivity(req: Request, res: Response) {
        try{

            const covid19Positivity = await overviewRepository.retrieveCovid19Positivity();
            res.status(201).send(covid19Positivity); 
           
        }
        catch(err) {
            res.status(500).send ({
               message: "Some Error occured while retrieving covid19Positivity"


            });

        }
    }
}

