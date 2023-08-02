import { QueryTypes } from "sequelize";
import Database from "../db";
import { ScreeningByGender } from "../models/screeningByGender.model";
import { ScreeningByAgeGender } from "../models/screeningByAgeGender.model";

interface IScreeningRepository {
  retrieveScreeningByGender(): Promise<ScreeningByGender[]>;
  retrieveScreeningByAgeGender(): Promise<ScreeningByAgeGender[]>;
}

class ScreenigRepository implements IScreeningRepository {

  db = new Database();
  private retrievedScreeningData: any;
  private retrievedScreeningByAgeGender: any;

  async retrieveScreeningByGender(): Promise<ScreeningByGender[]> {
    const query = `SELECT 
           count(Screened) as Screened,
          (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
            FROM [dbo].[FactMortality]
            WHERE Screened = 1  
             GROUP BY Sex`
    this.retrievedScreeningData = await this.db.sequelize?.query<ScreeningByGender[]>(query, {
      type: QueryTypes.SELECT,
    });

    console.log(this.retrievedScreeningData);
    return this.retrievedScreeningData;
  }

  async retrieveScreeningByAgeGender(): Promise<ScreeningByAgeGender[]> {
    const query = `SELECT 
           count(Screened) as Screened,
          (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
            FROM [dbo].[FactMortality]
            WHERE Screened = 1  
             GROUP BY Sex`
    this.retrievedScreeningByAgeGender = await this.db.sequelize?.query<ScreeningByAgeGender[]>(query, {
      type: QueryTypes.SELECT,
    });

    console.log(this.retrievedScreeningByAgeGender);
    return this.retrievedScreeningByAgeGender;
  }

}
export default new ScreenigRepository