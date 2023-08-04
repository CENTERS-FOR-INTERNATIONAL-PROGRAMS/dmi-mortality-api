import { NumberEnrolled } from './../models/numberEnrolled.model';
import { QueryTypes } from 'sequelize';
import { Covid19ByAgeSex } from '../models/covid19ByAgeSex.model';
import { Covid19OverTime } from '../models/covid19overtime.model';
import { Covid19PositivityRate } from '../models/covid19Positivity.model';
import { Covid19PositivityByAgeGender } from '../models/covid19PositivityByAgeGender.model';
import { Covid19PositivityByGender } from '../models/covid19PositivityByGender.model';
import { Covid19OverallPositivityByFacility } from '../models/covid19OverallPositivityByFacility.model';
import Database from '../db';

interface IOverviewRepository {
    retrieveNumberEnrolledByFacility(): Promise<NumberEnrolled[]>
    retrieveCovid19ByAgeSex(): Promise<Covid19ByAgeSex[]>
    retrieveCovid19OverTime(): Promise<Covid19OverTime[]>
    retrieveCovid19Positivity(): Promise<Covid19PositivityRate[]>
    retrieveCovid19PositivityByGender(): Promise<Covid19PositivityByGender[]>
    retrieveCovid19OverallPositivityByFacility(): Promise<Covid19OverallPositivityByFacility[]>

}

class OverviewRepository implements IOverviewRepository {
    covid19OVerTime: any;

    numberEnrolled: any;
    covid19ByAgeSex: any;
    covidPositivityRate: any;
    covid19ScreenedByGenderAge: any;
    covid19PositivityByGender : any;
    covid19OverallPositivityByFacility : any;
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

        console.log(this.covid19OVerTime);

        return this.covid19OVerTime;
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
    async retrieveCovid19PositivityByGender(): Promise<Covid19PositivityByGender[]> {
 
        const query = `select count(p.Covid19Positive) As PositiveNumber,
        (SELECT SexValue  FROM [dbo].[DimSex] where SexId = sex) as Gender 
        from [dbo].[FactMortality] p where Covid19Positive = 1 and 
        SampleTested = 1 and SampleTested is not null and barcode is not null
        group by Sex`
            this.covid19PositivityByGender = await this.db.sequelize?.query<Covid19PositivityByGender[]>(query, {
            type: QueryTypes.SELECT,

             });

              console.log(this.covid19PositivityByGender);
            return this.covid19PositivityByGender;

    }
    async retrieveCovid19OverallPositivityByFacility(): Promise<Covid19OverallPositivityByFacility[]> {
        const query = `SELECT COUNT(p.Covid19Positive) As PositiveNumber,
        (SELECT FacilityNAme FROM [dbo].[DimFacility] WHERE FacilityId = Facility) Facility
        FROM [dbo].[FactMortality] p 
        WHERE Covid19Positive = 1 and 
        SampleTested = 1 and SampleTested is not null and barcode is not null
        GROUP BY Facility`
            this.covid19OverallPositivityByFacility = await this.db.sequelize?.query<Covid19OverallPositivityByFacility[]>(query, {
            type: QueryTypes.SELECT,

             });

              console.log(this.covid19OverallPositivityByFacility);
            return this.covid19OverallPositivityByFacility;
    }

    async retrieveCovid19PositivityByAgeGender(): Promise<Covid19PositivityByAgeGender[]> {
        const query = `SELECT Sum(p.Covid19Positive) As PositiveNumber,
        (SELECT SexValue from [dbo].[DimSex] where SexId = sex) Gender, 
        (SELECT AgeGroup from [dbo].[DimAgeGroup] where AgeGroupId = p.AgeGroup) AgeGroup
        FROM [dbo].[FactMortality] p 
        WHERE Covid19Positive = 1 and 
        SampleTested = 1 and SampleTested is not null and barcode is not null
        GROUP BY sex, AgeGroup`

        this.covid19ScreenedByGenderAge = await this.db.sequelize?.query<Covid19PositivityByAgeGender[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.covid19ScreenedByGenderAge);
        return this.covid19ScreenedByGenderAge;
    }
}

export default new OverviewRepository