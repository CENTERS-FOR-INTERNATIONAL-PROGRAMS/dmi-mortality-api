import { QueryTypes } from "sequelize";
import Database from "../../db";
import { AFISummary } from "../../models/afi/afiSummary.model";

interface IOverviewRepository {
    retrieveSummary(): Promise<AFISummary[]>;
}

class OverviewRepository implements IOverviewRepository {
    db = new Database();
    private retrievedData: any;

    async retrieveSummary(): Promise<AFISummary[]> {
        //TODO! Update query
        const query = `SELECT Distinct Covid19Positive, Covid19Negative FROM (
            select Covid19Positive=(select count(p.Covid19Positive)  from [dbo].[FactMortality] p where Covid19Positive = 1 and SampleTested = 1 and SampleTested is not null and barcode is not null), 
            Covid19Negative =(select count(N.Covid19Positive)  from [dbo].[FactMortality] N where Covid19Positive = 0 and SampleTested = 1 and SampleTested is not null and barcode is not null)    
            from [dbo].[FactMortality]  t
            Where SampleTested = 1 and SampleTested is not null and barcode is not null ) A`

        this.retrievedData = await this.db.sequelize?.query<AFISummary[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }
}

export default new OverviewRepository