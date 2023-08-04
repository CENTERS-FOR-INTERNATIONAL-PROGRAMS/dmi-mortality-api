import { QueryTypes } from "sequelize";
import Database from "../db";
import { ScreeningByGender } from "../models/screeningByGender.model";
import { ScreeningByAgeGender } from "../models/screeningByAgeGender.model";
import { numberScreenedHealthFacilities } from "../models/numberScreenedHealthFacilities.model";
import { screeningOverTime } from "../models/screeningOverTime.model";

interface IScreeningRepository {
  retrieveScreeningByGender(): Promise<ScreeningByGender[]>;
  retrieveScreeningByAgeGender(): Promise<ScreeningByAgeGender[]>;
  retrieveScreeningByHealthFacilities(): Promise<numberScreenedHealthFacilities[]>;
  retrieveScreeningOverTime(): Promise<screeningOverTime[]>;
}

class ScreeningRepository implements IScreeningRepository {

  db = new Database();
  private retrievedScreeningData: any;
  private retrievedScreeningByAgeGender: any;
  private retrievedScreeningByHealthFacilities: any;
  private retrievedScreeningOverTime: any;

  async retrieveScreeningByGender(): Promise<ScreeningByGender[]> {
    const query = ``  //Query for ScreeningByGender Data
    this.retrievedScreeningData = await this.db.sequelize?.query<ScreeningByGender[]>(query, {
      type: QueryTypes.SELECT,
    });

    console.log(this.retrievedScreeningData);
    return this.retrievedScreeningData;
  }

  async retrieveScreeningByAgeGender(): Promise<ScreeningByAgeGender[]> {
    const query = `` //Query for ScreeningByAgeGender Data
    this.retrievedScreeningByAgeGender = await this.db.sequelize?.query<ScreeningByAgeGender[]>(query, {
      type: QueryTypes.SELECT,
    });

    console.log(this.retrievedScreeningByAgeGender);
    return this.retrievedScreeningByAgeGender;
  }

  async retrieveScreeningByHealthFacilities(): Promise<numberScreenedHealthFacilities[]> {
    const query = `` //Query for Screened Health Facilities
    this.retrievedScreeningByHealthFacilities = await this.db.sequelize?.query<numberScreenedHealthFacilities[]>(query, {
      type: QueryTypes.SELECT,
    });

    console.log(this.retrievedScreeningByHealthFacilities);
    return this.retrievedScreeningByHealthFacilities;
  }

  async retrieveScreeningOverTime(): Promise<screeningOverTime[]> {
    const query = `SELECT 
           count(Screened) as Screened,
          (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
            FROM [dbo].[FactMortality]
            WHERE Screened = 1  
             GROUP BY Sex` //Test Query Screeened over time
    this.retrievedScreeningOverTime = await this.db.sequelize?.query<screeningOverTime[]>(query, {
      type: QueryTypes.SELECT,
    });

    console.log(this.retrievedScreeningOverTime);
    return this.retrievedScreeningOverTime;
  }

}


export default new ScreeningRepository