import { NumberEnrolled } from './../models/numberEnrolled.model';
import sequlize from "../db/connection";

import { QueryTypes } from 'sequelize';

interface IOverviewRepository {
  retrieveAll() : Promise<NumberEnrolled[]>  
}

class OverviewRepository implements IOverviewRepository {

 
    async retrieveAll(): Promise<NumberEnrolled[]> {
        let condition = '';
        condition += 'and SampleTested is not null and barcode is not null Group by Facility';
        const bindings: any[] = [];
        const query =  `SELECT  newid() as Id, sum( SampleTested) as Enrolled, sum(Covid19Positive) 
                        Covid19Positive,Facility  from [dbo].[FactMortality] 
                        Where SampleTested = 1 ${condition};`
         const [results, metadata]  = await sequlize.query<NumberEnrolled[]>(query, { 
            type : QueryTypes.SELECT,

        });
        console.log(results);
        return results;

    }

}
export default new OverviewRepository