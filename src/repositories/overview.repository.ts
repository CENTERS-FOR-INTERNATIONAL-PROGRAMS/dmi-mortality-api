import { NumberEnrolled } from './../models/numberEnrolled.model';
import { QueryTypes } from 'sequelize';
import { Covid19Summary } from '../models/covid19Summary.model';
import { Covid19ByAgeSex } from '../models/covid19ByAgeSex.model';
import { Covid19OverTime } from '../models/covid19overtime.model';
import { Covid19PositivityRate } from '../models/covid19Positivity.model';
import { Covid19PositivityByAgeGender } from '../models/covid19PositivityByAgeGender.model';
import { Covid19PositivityByGender } from '../models/covid19PositivityByGender.model';
import { Covid19OverallPositivityByFacility } from '../models/covid19OverallPositivityByFacility.model';
import Database from '../db';

interface IOverviewRepository {
    retrieveCovid19Summary(): Promise<Covid19Summary[]>
    retrieveCovid19SummaryByMonth(): Promise<Covid19Summary[]>
    retrieveNumberEnrolledByFacility(): Promise<NumberEnrolled[]>
    retrieveCovid19ByAgeSex(): Promise<Covid19ByAgeSex[]>
    retrieveCovid19OverTime(): Promise<Covid19OverTime[]>
    retrieveCovid19Positivity(): Promise<Covid19PositivityRate[]>
    retrieveCovid19PositivityByGender(): Promise<Covid19PositivityByGender[]>
    retrieveCovid19OverallPositivityByFacility(): Promise<Covid19OverallPositivityByFacility[]>
}

class OverviewRepository implements IOverviewRepository {
    covid19Summary: any;
    covid19SummaryByMonth: any;
    covid19OverTime: any;

    numberEnrolled: any;
    covid19ByAgeSex: any;
    covidPositivityRate: any;
    covid19ScreenedByGenderAge: any;
    covid19PositivityByGender: any;
    covid19OverallPositivityByFacility: any;
    db = new Database();

    async retrieveCovid19Summary(): Promise<Covid19Summary[]> {
        const query = `--Total Screened
        SELECT TotalScreened, Eligible, 
        CAST((Eligible * 100.0 / NULLIF(TotalScreened, 0))AS INT)  PercentEligible,
        Enrolled, 
        CAST((Enrolled * 100.0 / NULLIF(Eligible, 0))AS INT)  PercentEnrolled,
        Tested,
        CAST(( Tested* 100.0 / NULLIF(enrolled, 0))AS INT)  PercentTested,
        Positive,
        CAST(( Positive* 100.0 / NULLIF(Tested, 0))AS INT)  PercentPositive
        FROM (
        SELECT  
        (SELECT COUNT(Screened) 
        FROM [dbo].[FactMortality] p
        WHERE Screened = 1 ) AS TotalScreened ,
         --eligible
        (SELECT Count(Eligible) Eligible FROM [dbo].[FactMortality] p
        WHERE Eligible = 1) as Eligible,
        ---Enrolled  
        (SELECT   sum( SampleTested)  
        from [dbo].[FactMortality] 
        Where SampleTested = 1 and SampleTested is not null and barcode is not null ) AS Enrolled,

         ---TEsted
        (SELECT   sum( SampleTested) 
        from [dbo].[FactMortality] 
        Where SampleTested = 1 and SampleTested is not null and barcode is not null ) AS Tested ,
        ---Postive
        (SELECT 
                sum(Covid19Positive) Positive      
                FROM  [dbo].[FactMortality]  p
                WHERE SampleTested = 1 and SampleTested is not null and barcode is not null ) AS Positive
        ) A`

        this.covid19Summary = await this.db.sequelize?.query<Covid19Summary[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.covid19Summary);
        return this.covid19Summary;
    }

    async retrieveCovid19SummaryByMonth(): Promise<Covid19Summary[]> {
        const query =
            `DECLARE @CurrentMonth INT;
        DECLARE @CurrentYear INT;
        DECLARE @LastDayOfPreviousMonth  INT;
        
        SET @CurrentMonth = MONTH(getdate()) - 1;
        SET @CurrentYear = YEAR(getdate());
        SET @LastDayOfPreviousMonth = DAY(EOMONTH(GETDATE())) 
        DECLARE @PreviousMonthLastDateIdInString VARCHAR(10);
        DECLARE @PreviousMonthLastDateIdInINT INT;
        
        SET @PreviousMonthLastDateIdInString = CAST(@CurrentYear AS VARCHAR)
        + 
        CASE WHEN @CurrentMonth < 10 THEN 
        +'0'+
        CAST(@CurrentMonth AS VARCHAR)
        ELSE
        CAST(@CurrentMonth AS VARCHAR)
        END
            
        + CAST(@LastDayOfPreviousMonth AS VARCHAR);
        
        
        SET @PreviousMonthLastDateIdInINT =   CAST(@PreviousMonthLastDateIdInString AS INT)
        
        
        SELECT TotalScreened,TotalScreenedLastMonth, Eligible,EligibleLastMonth, 
        
        
        Enrolled,EnrolledLastMonth, 
        
        Tested,TestedLastMonth,
        
        Positive,PositiveLastMonth
        
        FROM (
        SELECT  
        (SELECT COUNT(Screened) 
        FROM [dbo].[FactMortality] p
        WHERE Screened = 1  ) AS TotalScreened,
        (SELECT COUNT(Screened) 
        FROM [dbo].[FactMortality] p
        WHERE Screened = 1 and ReviewDate <= @PreviousMonthLastDateIdInINT  and ReviewDate is not null ) AS TotalScreenedLastMonth ,
         --eligible
        
         (SELECT Count(Eligible) Eligible FROM [dbo].[FactMortality] p
        WHERE Eligible = 1 ) as Eligible,
        (SELECT Count(Eligible) Eligible FROM [dbo].[FactMortality] p
        WHERE Eligible = 1 and ReviewDate <= @PreviousMonthLastDateIdInINT and ReviewDate is not null) as EligibleLastMonth,
        ---Enrolled  
        (SELECT   sum( Enrolled)  
        from [dbo].[FactMortality] 
        Where Enrolled = 1 and Enrolled is not null and barcode is not null) AS Enrolled,
        
        (SELECT   sum( Enrolled)  
        from [dbo].[FactMortality] 
        Where Enrolled = 1 and Enrolled is not null and barcode is not null
        and ReviewDate <= @PreviousMonthLastDateIdInINT and ReviewDate is not null ) AS EnrolledLastMonth,
        
         ---TEsted
        
         (SELECT   sum( SampleTested) 
        from [dbo].[FactMortality] 
        Where SampleTested = 1 and SampleTested is not null and barcode is not null) AS Tested,
        (SELECT   sum( SampleTested) 
        from [dbo].[FactMortality] 
        Where SampleTested = 1 and SampleTested is not null and barcode is not null
        and ReviewDate <= @PreviousMonthLastDateIdInINT and ReviewDate is not null ) AS TestedLastMonth ,
        ---Postive
        
        (SELECT 
                sum(Covid19Positive) Positive      
                FROM  [dbo].[FactMortality]  p
                WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
                ) AS Positive,
        (SELECT 
                sum(Covid19Positive) Positive      
                FROM  [dbo].[FactMortality]  p
                WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
                and ReviewDate <= @PreviousMonthLastDateIdInINT and ReviewDate is not null) AS PositiveLastMonth
        ) A`

        this.covid19SummaryByMonth = await this.db.sequelize?.query<Covid19PositivityByAgeGender[]>(query, {
            type: QueryTypes.SELECT,
        });

        return this.covid19SummaryByMonth;
    }

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
        this.covid19OverTime = await this.db.sequelize?.query<Covid19OverTime[]>(query, {
            type: QueryTypes.SELECT,

        });

        console.log(this.covid19OverTime);

        return this.covid19OverTime;
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