import { QueryTypes } from "sequelize";
import Database from "../db";
import { EnrollmentByGender } from "../models/enrollmentByGender.model";
import { EnrollmentByAgeGender } from "../models/enrollmentByAgeGender.model";
import { EnrollmentByFacility } from "../models/enrollmentByFacility.model";
import { EnrollmentByEpiWeek } from "../models/enrollmentByEpiWeek.model";

interface IEnrollmentRepository {
    retrieveEnrollmentByGender(): Promise<EnrollmentByGender[]>;
    retrieveEnrollmentByAgeGender(): Promise<EnrollmentByAgeGender[]>;
    retrieveEnrollmentByFacility(): Promise<EnrollmentByFacility[]>;
    retrieveEnrollmentByEpiWeek(): Promise<EnrollmentByEpiWeek[]>;
}

class EnrollmentRepository implements IEnrollmentRepository {
    db = new Database();
    private retrievedEnrollmentByGender: any;
    private retrievedEnrollmentByAgeGender: any;
    private retrievedEnrollmentByFacility: any;
    private retrievedEnrollmentByEpiWeek: any;

    async retrieveEnrollmentByGender(): Promise<EnrollmentByGender[]> {
        const query = `SELECT 
           count(Screened) as Screened,
          (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
            FROM [dbo].[FactMortality]
            WHERE Screened = 1  
             GROUP BY Sex`
        this.retrievedEnrollmentByGender = await this.db.sequelize?.query<EnrollmentByGender[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByGender);
        return this.retrievedEnrollmentByGender;
    }

    async retrieveEnrollmentByAgeGender(): Promise<EnrollmentByAgeGender[]> {
        const query = `SELECT 
           count(Screened) as Screened,
          (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
            FROM [dbo].[FactMortality]
            WHERE Screened = 1  
             GROUP BY Sex`
        this.retrievedEnrollmentByAgeGender = await this.db.sequelize?.query<EnrollmentByAgeGender[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByAgeGender);
        return this.retrievedEnrollmentByAgeGender;
    }

    async retrieveEnrollmentByFacility(): Promise<EnrollmentByFacility[]> {
        const query = `SELECT 
           count(Screened) as Screened,
          (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
            FROM [dbo].[FactMortality]
            WHERE Screened = 1  
             GROUP BY Sex`
        this.retrievedEnrollmentByFacility = await this.db.sequelize?.query<EnrollmentByFacility[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByFacility);
        return this.retrievedEnrollmentByFacility;
    }

    async retrieveEnrollmentByEpiWeek(): Promise<EnrollmentByEpiWeek[]> {
        const query = `SELECT 
           count(Screened) as Screened,
          (Select sexValue from [dbo].[DimSex] where SexID = SEX) as Gender  
            FROM [dbo].[FactMortality]
            WHERE Screened = 1  
             GROUP BY Sex`
        this.retrievedEnrollmentByEpiWeek = await this.db.sequelize?.query<EnrollmentByEpiWeek[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByEpiWeek);
        return this.retrievedEnrollmentByEpiWeek;
    }
}
export default new EnrollmentRepository