import { NumberEnrolled } from './../models/numberEnrolled.model';


import { QueryTypes } from 'sequelize';
import { Covid19ByAgeSex } from '../models/covid19ByAgeSex.model';
import { Covid19OverTime } from '../models/covid19overtime.model';
import { Covid19PositivityRate } from '../models/covid19Positivity.model';
import Database from '../db';




interface IOverviewRepository {
    retrieveNumberEnrolledByFacility(): Promise<NumberEnrolled[]>
    retrieveCovid19ByAgeSex(): Promise<Covid19ByAgeSex[]>
    retrieveCovid19OverTime(): Promise<Covid19OverTime[]>
    retrieveCovid19Positivity(): Promise<Covid19PositivityRate[]>

}

class OverviewRepository implements IOverviewRepository {
    covid19OVerTime: any;
    numberEnrolled : any;
    covid19ByAgeSex : any;
    covidPositivityRate : any;
     db = new Database();

    async retrieveNumberEnrolledByFacility(): Promise<NumberEnrolled[]> {
        let condition = '';
        condition += 'and SampleTested is not null and barcode is not null Group by Facility';
        const bindings: any[] = [];
        const query = `SELECT  newid() as Id, sum( SampleTested) as Enrolled, sum(Covid19Positive) 
                        Covid19Positive,Facility  from [dbo].[FactMortality] 
                        Where SampleTested = 1 ${condition};`

        this.numberEnrolled = await this.db.sequelize?.query<NumberEnrolled[]>(query, {
            type: QueryTypes.SELECT,

        });
     
        return this.numberEnrolled;
    }
  
    async retrieveCovid19ByAgeSex(): Promise<Covid19ByAgeSex[]> {
        let condition = '';
        condition += 'and SampleTested is not null and barcode is not null and AgeGroup is not null Group by AgeGroup,sex'
        const query = `SELECT 
                       sum(Covid19Positive) CovidPositive, AgeGroup, sex
                       FROM  [dbo].[FactMortality]  p
                       WHERE SampleTested = 1 ${condition};`
         this.covid19ByAgeSex = await this.db.sequelize?.query<Covid19ByAgeSex[]>(query, {
            type: QueryTypes.SELECT,

             });
      return this.covid19ByAgeSex;


    }
    async retrieveCovid19OverTime(): Promise<Covid19OverTime[]> {
        
        let condition = '';
        condition += 'and SampleTested is not null and barcode is not null'
        const query = `SELECT 
        count(SampleTested) SampleTested, 
        sum(Covid19Positive) CovidPositive,
        EpiWeek

        FROM  [dbo].[FactMortality]  p
        WHERE SampleTested = 1 ${condition}
        Group by EpiWeek;`
        this.covid19OVerTime = await this.db.sequelize?.query<Covid19OverTime[]>(query, {
        type: QueryTypes.SELECT,

        });
 
        console.log( this.covid19OVerTime);

        return  this.covid19OVerTime; 
    }
    async retrieveCovid19Positivity(): Promise<Covid19PositivityRate[]> {
 
        const query = `SELECT Distinct Covid19Positive, Covid19Negative FROM (
            select Covid19Positive=(select count(p.Covid19Positive)  from [dbo].[FactMortality] p where Covid19Positive = 1 and SampleTested = 1 and SampleTested is not null and barcode is not null )
            , Covid19Negative =(select count(N.Covid19Positive)  from [dbo].[FactMortality] N where Covid19Positive = 0 and SampleTested = 1 and SampleTested is not null and barcode is not null)     
            from [dbo].[FactMortality]  t
            Where SampleTested = 1 and SampleTested is not null and barcode is not null ) A`
            this.covidPositivityRate = await this.db.sequelize?.query<Covid19PositivityRate[]>(query, {
            type: QueryTypes.SELECT,

             });

              console.log(this.covidPositivityRate);
            return this.covidPositivityRate;

    }

}
   
export default new OverviewRepository