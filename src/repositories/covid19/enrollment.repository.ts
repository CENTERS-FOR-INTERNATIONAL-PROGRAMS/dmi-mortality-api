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
        SUM(CASE WHEN sex = '2' THEN Screened ELSE 0 END) AS Male_Screened,
        SUM(CASE WHEN sex = '2' THEN Eligible ELSE 0 END) AS Male_Eligible,
        SUM(CASE WHEN sex = '2' THEN Enrolled ELSE 0 END) AS Male_Enrolled,
        SUM(CASE WHEN sex = '1' THEN Screened ELSE 0 END) AS Female_Screened,
        SUM(CASE WHEN sex = '1' THEN Eligible ELSE 0 END) AS Female_Eligible,
        SUM(CASE WHEN sex = '1' THEN Enrolled ELSE 0 END) AS Female_Enrolled
    FROM
        [dbo].[FactMortality]`
        this.retrievedData = await this.db.sequelize?.query<Covid19Enrollment[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedData);
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