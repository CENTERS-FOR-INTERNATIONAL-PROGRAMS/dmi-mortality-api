import { QueryTypes } from "sequelize";
import Database from "../../db";
import { Covid19ScreeningCascade } from "../../models/covid19/covid19ScreeningCascade.model";

interface IScreeningRepository {
    retrieveCascade(): Promise<Covid19ScreeningCascade[]>;
}

class ScreeningRepository implements IScreeningRepository {
    db = new Database();
    private retrievedData: any;

    async retrieveCascade(): Promise<Covid19ScreeningCascade[]> {
        const query = `SELECT TotalScreened, Eligible, 
        Enrolled FROM (SELECT  
        (SELECT COUNT(Screened) 
        FROM [dbo].[FactMortality] p
        WHERE Screened = 1 ) AS TotalScreened ,
         
        -- Eligible
        (SELECT Count(Eligible) Eligible FROM [dbo].[FactMortality] p
        WHERE Eligible = 1) as Eligible,
        
        -- Enrolled  
        (SELECT   sum( SampleTested)  
        FROM [dbo].[FactMortality] 
        WHERE SampleTested = 1 and SampleTested is not null and barcode is not null ) AS Enrolled,
    
        -- Tested
        (SELECT   sum( SampleTested) 
        FROM [dbo].[FactMortality] 
        WHERE SampleTested = 1 and SampleTested is not null and barcode is not null ) AS Tested ,
    
        -- Postive
        (SELECT 
        sum(Covid19Positive) Positive      
        FROM  [dbo].[FactMortality]  p
        WHERE SampleTested = 1 and SampleTested is not null and barcode is not null ) AS Positive) A`

        this.retrievedData = await this.db.sequelize?.query<Covid19ScreeningCascade[]>(query, {
            type: QueryTypes.SELECT,
        });

        return this.retrievedData;
    }
}

export default new ScreeningRepository