import { QueryTypes } from "sequelize";
import Database from "../db";
import { Covid19ResultsByStatus } from "../models/covid19ResultsByStatus.model";
import { Covid19ResultsByFacility } from "../models/covid19ResultsByFacility.model";

interface IResultsRepository {
    retrieveCovi19ResultsByStatus(): Promise<Covid19ResultsByStatus[]>;
    retrieveCovi19ResultsByFacility(): Promise<Covid19ResultsByFacility[]>;
}

class ResultsRepository implements IResultsRepository {
    db = new Database();
    private retrievedCovid19ResultsByStatus: any;
    private retrievedCovid19ResultsByFacility: any;

    async retrieveCovi19ResultsByStatus(): Promise<Covid19ResultsByStatus[]> {
        const query = `SELECT Distinct Covid19Positive, Covid19Negative FROM (
            select Covid19Positive=(select count(p.Covid19Positive)  from [dbo].[FactMortality] p where Covid19Positive = 1 and SampleTested = 1 and SampleTested is not null and barcode is not null), 
            Covid19Negative =(select count(N.Covid19Positive)  from [dbo].[FactMortality] N where Covid19Positive = 0 and SampleTested = 1 and SampleTested is not null and barcode is not null)    
            from [dbo].[FactMortality]  t
            Where SampleTested = 1 and SampleTested is not null and barcode is not null ) A`

        this.retrievedCovid19ResultsByStatus = await this.db.sequelize?.query<Covid19ResultsByStatus[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedCovid19ResultsByStatus);
        return this.retrievedCovid19ResultsByStatus;
    }

    async retrieveCovi19ResultsByFacility(): Promise<Covid19ResultsByFacility[]> {
        const query = `SELECT 
        count(SampleTested) Enrolled, sum(Covid19Positive) Covid19Positive,
        (SELECT FacilityName FRoM [dbo].[DimFacility] where FacilityId = Facility) Facility
        FROM  [dbo].[FactMortality]  p
        WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
        Group by Facility`

        this.retrievedCovid19ResultsByFacility = await this.db.sequelize?.query<Covid19ResultsByFacility[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedCovid19ResultsByFacility);
        return this.retrievedCovid19ResultsByFacility;
    }
}

export default new ResultsRepository