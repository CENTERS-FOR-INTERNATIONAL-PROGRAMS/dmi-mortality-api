import { QueryTypes } from "sequelize";
import Database from "../../db";
import { Covid19Results } from "../../models/covid19/covid19Results.model";

interface IResultsRepository {
    retrieveByStatus(): Promise<Covid19Results[]>;
    retrieveByFacility(): Promise<Covid19Results[]>;
    retrieveByAgeGender(): Promise<Covid19Results[]>;
    retrieveByPositivityOverTime(): Promise<Covid19Results[]>;
}

class ResultsRepository implements IResultsRepository {
    db = new Database();
    private retrievedData: any;

    async retrieveByStatus(): Promise<Covid19Results[]> {
        const query = `SELECT Distinct Covid19Positive, Covid19Negative FROM (
            select Covid19Positive=(select count(p.Covid19Positive)  from [dbo].[FactMortality] p where Covid19Positive = 1 and SampleTested = 1 and SampleTested is not null and barcode is not null), 
            Covid19Negative =(select count(N.Covid19Positive)  from [dbo].[FactMortality] N where Covid19Positive = 0 and SampleTested = 1 and SampleTested is not null and barcode is not null)    
            from [dbo].[FactMortality]  t
            Where SampleTested = 1 and SampleTested is not null and barcode is not null ) A`

        this.retrievedData = await this.db.sequelize?.query<Covid19Results[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }

    async retrieveByFacility(): Promise<Covid19Results[]> {
        const query = `SELECT COUNT(SampleTested) SampleTested , SUM(Covid19Positive) Covid19Positive,
        (COUNT(SampleTested) - SUM(Covid19Positive)) Covid19Negative,
        (SELECT FacilityName FRoM [dbo].[DimFacility] where FacilityId = Facility) Facility
        FROM  [dbo].[FactMortality]  p
        WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
        Group by Facility`

        this.retrievedData = await this.db.sequelize?.query<Covid19Results[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }

    async retrieveByAgeGender(): Promise<Covid19Results[]> {
        const query = `SELECT sum(Covid19Positive) Covid19Positive,
        (SELECT AgeGroup FRoM [dbo].[DimAgeGroup] where AgeGroupId = p.AgeGroup) AgeGroup,
        (SELECT SexValue FRoM [dbo].[DimSex] where SexId = p.Sex) Gender
         FROM  [dbo].[FactMortality]  p
         WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
         Group by AgeGroup, sex`

        this.retrievedData = await this.db.sequelize?.query<Covid19Results[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }

    async retrieveByPositivityOverTime(): Promise<Covid19Results[]> {
        const query = `SELECT 
        count(SampleTested) SampleTested, 
        sum(Covid19Positive) CovidPositive,
        EpiWeek,
        (select  [Month] from [dbo].[DimEpiWeek] where WeekKey = P.EpiWeek ) [Month],
        (select  [Year] from [dbo].[DimEpiWeek] where WeekKey = P.EpiWeek ) [Year]
        FROM  [dbo].[FactMortality]  p
        WHERE SampleTested =1 and SampleTested is not null and barcode is not null
        Group by EpiWeek;`

        this.retrievedData = await this.db.sequelize?.query<Covid19Results[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }
}

export default new ResultsRepository