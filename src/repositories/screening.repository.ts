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
    const query = `SELECT count(Screened) as Screened,
    (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
    FROM [dbo].[FactMortality]
    WHERE Screened = 1  
     GROUP BY Sex`  //Query for ScreeningByGender Data
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
    COUNT(Screened) AS Screened,
    (SELECT [FacilityName] FROM [dbo].[DimFacility] WHERE FacilityId = p.Facility) Facility
    FROM [dbo].[FactMortality] p
    WHERE Screened = 1  
    GROUP BY Facility` //Query for Screened Health Facilities
    this.retrievedScreeningByHealthFacilities = await this.db.sequelize?.query<ScreeningByHealthFacilities[]>(query, {
      type: QueryTypes.SELECT,
    });

   // console.log(this.retrievedScreeningByHealthFacilities);
    return this.retrievedScreeningByHealthFacilities;
  }

  async retrieveScreeningOverTime(): Promise<screeningOverTime[]> {
    const query = `SELECT 
    COUNT(Screened) AS Screened,
    EpiWeek
    FROM [dbo].[FactMortality] p
    WHERE Screened = 1  
    GROUP BY EpiWeek` //Query Screeened over time
    this.retrievedScreeningOverTime = await this.db.sequelize?.query<screeningOverTime[]>(query, {
      type: QueryTypes.SELECT,
    });

    //console.log(this.retrievedScreeningOverTime);
    return this.retrievedScreeningOverTime;
  }

}


export default new ScreeningRepository