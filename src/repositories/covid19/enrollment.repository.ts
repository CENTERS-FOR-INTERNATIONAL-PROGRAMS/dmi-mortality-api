import { QueryTypes } from "sequelize";
import Database from "../../db";
import { Covid19Enrollment } from "../../models/covid19/covid19Enrollment.model";

interface IEnrollmentRepository {
    retrieveByGender(): Promise<Covid19Enrollment[]>;
    retrieveByAgeGender(): Promise<Covid19Enrollment[]>;
    retrieveByFacility(): Promise<Covid19Enrollment[]>;
    retrieveOverTime(): Promise<Covid19Enrollment[]>;
}

class EnrollmentRepository implements IEnrollmentRepository {
    db = new Database();
    private retrievedData: any;

    async retrieveByGender(): Promise<Covid19Enrollment[]> {
        const query = `SELECT
        EnrolledMale, EnrolledFemale, TestedMale, TestedFemale, PositiveMale, PositiveFemale
        FROM (SELECT
        
        (SELECT sum( enrolled)  
        from [dbo].[FactMortality] 
        Where enrolled = 1 and SEX = 1 and  barcode is not null ) AS EnrolledMale,

        (SELECT sum( Enrolled)  
        from [dbo].[FactMortality] 
        Where Enrolled = 1 and SEX = 2 and  barcode is not null ) AS EnrolledFemale,
         
        (SELECT   sum( SampleTested) 
        FROM [dbo].[FactMortality] 
        WHERE SampleTested = 1 and  sex =1  and barcode is not null ) AS TestedMale ,

        (SELECT sum( SampleTested) 
        FROM [dbo].[FactMortality] 
        WHERE SampleTested = 1 and  sex =2  and barcode is not null ) AS TestedFemale ,
        
        (SELECT 
        sum(Covid19Positive) Positive      
        FROM  [dbo].[FactMortality]  p
        WHERE Covid19Positive = 1 and sex = 1  and barcode is not null ) AS PositiveMale,

        (SELECT 
        sum(Covid19Positive) Positive      
        FROM  [dbo].[FactMortality]  p
        WHERE Covid19Positive = 1 and sex = 2  and barcode is not null ) AS PositiveFemale) A`

        this.retrievedData = await this.db.sequelize?.query<Covid19Enrollment[]>(query, {
            type: QueryTypes.SELECT,
        });

        return this.retrievedData;
    }

    async retrieveByAgeGender(): Promise<Covid19Enrollment[]> {
        const query = `SELECT sum( enrolled) as EnrolledNumber,
        (SELECT SexValue from [dbo].[DimSex] where SexId = sex) Gender,
        (SELECT  AgeGroup from [dbo].[DimAgeGroup] where AgeGroupId = P.AgeGroup ) AgeGroup
        from [dbo].[FactMortality]  P 
        Where enrolled = 1 
        Group by Sex, AgeGroup`
        this.retrievedData = await this.db.sequelize?.query<Covid19Enrollment[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }

    async retrieveByFacility(): Promise<Covid19Enrollment[]> {
        const query = `SELECT  count(SampleTested) EnrolledNumber, sum(Covid19Positive) Covid19Positive,
        (SELECT FacilityName FRoM [dbo].[DimFacility] where FacilityId = Facility) Facility
        FROM  [dbo].[FactMortality]  p
        WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
        Group by Facility`
        this.retrievedData = await this.db.sequelize?.query<Covid19Enrollment[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }

    async retrieveOverTime(): Promise<Covid19Enrollment[]> {
        const query = `SELECT sum(Eligible) ElligibleNumber, sum(enrolled) EnrolledNumber, EpiWeek,
        (SELECT  [Month] FROM  [dbo].[DimEpiWeek] where WeekKey = P.EpiWeek )[Month],
        (SELECT  [Year] FROM  [dbo].[DimEpiWeek] where WeekKey = P.EpiWeek ) [Year]
        FROM  [dbo].[FactMortality]  p
        WHERE  eligible = 1 or Enrolled = 1 
        GROUP BY EpiWeek;`
        this.retrievedData = await this.db.sequelize?.query<Covid19Enrollment[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
        return this.retrievedData;
    }
}

export default new EnrollmentRepository