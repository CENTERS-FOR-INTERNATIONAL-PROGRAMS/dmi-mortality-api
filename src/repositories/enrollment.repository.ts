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
        const query = `SELECT   sum( SampleTested) as Enrolled,
        (SELECT SexValue from [dbo].[DimSex] where SexId = sex) Gender
        from [dbo].[FactMortality] 
        Where SampleTested = 1 and SampleTested is not null and barcode is not null
        Group by Sex`
        this.retrievedEnrollmentByGender = await this.db.sequelize?.query<EnrollmentByGender[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByGender);
        return this.retrievedEnrollmentByGender;
    }

    async retrieveEnrollmentByAgeGender(): Promise<EnrollmentByAgeGender[]> {
        const query = `SELECT sum( SampleTested) as Enrolled,
        (SELECT SexValue from [dbo].[DimSex] where SexId = sex) Gender,
        (SELECT  AgeGroup from [dbo].[DimAgeGroup] where AgeGroupId = P.AgeGroup ) AgeGroup
        from [dbo].[FactMortality]  P 
        Where SampleTested = 1 and SampleTested is not null and barcode is not null
        Group by Sex, AgeGroup`
        this.retrievedEnrollmentByAgeGender = await this.db.sequelize?.query<EnrollmentByAgeGender[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByAgeGender);
        return this.retrievedEnrollmentByAgeGender;
    }

    async retrieveEnrollmentByFacility(): Promise<EnrollmentByFacility[]> {
        const query = `SELECT sum( SampleTested) as Enrolled,
        (SELECT [FacilityName] From [dbo].[DimFacility] WHERE [FacilityId] = Facility) Facility
        from [dbo].[FactMortality]  P 
        Where SampleTested = 1 and SampleTested is not null and barcode is not null
        Group by Facility`
        this.retrievedEnrollmentByFacility = await this.db.sequelize?.query<EnrollmentByFacility[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByFacility);
        return this.retrievedEnrollmentByFacility;
    }

    async retrieveEnrollmentByEpiWeek(): Promise<EnrollmentByEpiWeek[]> {
        const query = `SELECT 
        sum(SampleTested) as Enrolled, EpiWeek
        FROM  [dbo].[FactMortality]  p
        WHERE SampleTested = 1 and SampleTested is not null and barcode is not null
        Group by EpiWeek;`
        this.retrievedEnrollmentByEpiWeek = await this.db.sequelize?.query<EnrollmentByEpiWeek[]>(query, {
            type: QueryTypes.SELECT,
        });

        console.log(this.retrievedEnrollmentByEpiWeek);
        return this.retrievedEnrollmentByEpiWeek;
    }
}
export default new EnrollmentRepository