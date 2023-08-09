import { QueryTypes } from "sequelize";
import Database from "../db";
import { ScreeningByGender } from "../models/screeningByGender.model";
import { ScreeningByAgeGender } from "../models/screeningByAgeGender.model";
import { ScreeningByHealthFacilities } from "../models/screeningByHealthFacilities.model";
import { screeningOverTime } from "../models/screeningOverTime.model";

interface IScreeningRepository {
  retrieveScreeningByGender(): Promise<ScreeningByGender[]>;
  retrieveScreeningByAgeGender(): Promise<ScreeningByAgeGender[]>;
  retrieveScreeningByHealthFacilities(): Promise<ScreeningByHealthFacilities[]>;
  retrieveScreeningOverTime(): Promise<screeningOverTime[]>;
}

class ScreeningRepository implements IScreeningRepository {

  db = new Database();
  private retrievedScreeningData: any;
  private retrievedScreeningByAgeGender: any;
  private retrievedScreeningByHealthFacilities: any;
  private retrievedScreeningOverTime: any;

  async retrieveScreeningByGender(): Promise<ScreeningByGender[]> {
    const query = `SELECT
    SUM(CASE WHEN sex = '2' THEN Screened ELSE 0 END) AS Male_Screened,
    SUM(CASE WHEN sex = '2' THEN Eligible ELSE 0 END) AS Male_Eligible,
    SUM(CASE WHEN sex = '2' THEN Enrolled ELSE 0 END) AS Male_Enrolled,
    SUM(CASE WHEN sex = '1' THEN Screened ELSE 0 END) AS Female_Screened,
    SUM(CASE WHEN sex = '1' THEN Eligible ELSE 0 END) AS Female_Eligible,
    SUM(CASE WHEN sex = '1' THEN Enrolled ELSE 0 END) AS Female_Enrolled
    FROM
    [dbo].[FactMortality]`  //Query for ScreeningByGender Data
    this.retrievedScreeningData = await this.db.sequelize?.query<ScreeningByGender[]>(query, {
      type: QueryTypes.SELECT,
    });

   // console.log(this.retrievedScreeningData);
    return this.retrievedScreeningData;
  }

  async retrieveScreeningByAgeGender(): Promise<ScreeningByAgeGender[]> {
    const query = `SELECT 
    COUNT(Screened) AS Screened,
    (SELECT sexValue FROM [dbo].[DimSex] WHERE SexID = SEX) AS Gender,  
    (SELECT ageGroup FROM [dbo].[DimAgeGroup] WHERE AgeGroupId = p.AgeGroup) AgeGroup
    FROM [dbo].[FactMortality] p
    WHERE Screened = 1  
    GROUP BY Sex, AgeGroup` //Query for ScreeningByAgeGender Data
    this.retrievedScreeningByAgeGender = await this.db.sequelize?.query<ScreeningByAgeGender[]>(query, {
      type: QueryTypes.SELECT,
    });

    //console.log(this.retrievedScreeningByAgeGender);
    return this.retrievedScreeningByAgeGender;
  }

  async retrieveScreeningByHealthFacilities(): Promise<ScreeningByHealthFacilities[]> {
    const query = `SELECT 
    sum(Screened) Screened,
    COUNT(SampleTested) Enrolled, SUM(Covid19Positive) Covid19Positive,
      (SELECT FacilityName FRoM [dbo].[DimFacility] where FacilityId = Facility) Facility
      FROM  [dbo].[FactMortality]  p
      WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
      Group by Facility` //Query for Screened Health Facilities
    this.retrievedScreeningByHealthFacilities = await this.db.sequelize?.query<ScreeningByHealthFacilities[]>(query, {
      type: QueryTypes.SELECT,
    });

   // console.log(this.retrievedScreeningByHealthFacilities);
    return this.retrievedScreeningByHealthFacilities;
  }

  async retrieveScreeningOverTime(): Promise<screeningOverTime[]> {
    const query = `SELECT 
    sum(Screened) Screened,
    EpiWeek,
    (SELECT  [Month] FROM  [dbo].[DimEpiWeek] where WeekKey = P.EpiWeek )[Month],
    (SELECT  [Year] FROM  [dbo].[DimEpiWeek] where WeekKey = P.EpiWeek ) [Year]
    FROM  [dbo].[FactMortality]  p
    WHERE  SampleTested = 1 or Enrolled = 1 
    GROUP BY EpiWeek` //Query Screeened over time
    this.retrievedScreeningOverTime = await this.db.sequelize?.query<screeningOverTime[]>(query, {
      type: QueryTypes.SELECT,
    });

    //console.log(this.retrievedScreeningOverTime);
    return this.retrievedScreeningOverTime;
  }

}


export default new ScreeningRepository