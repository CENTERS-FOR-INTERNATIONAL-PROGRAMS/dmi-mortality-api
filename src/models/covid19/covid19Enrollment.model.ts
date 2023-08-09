import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19Enrollment extends Model {
     public Facility?: number;

     public ElligibleNumber?: number;
     public EnrolledNumber?: number;
     public PercentEnrolled?: number;
     
     public FemaleNumber?: number;
     public MaleNumber?: number;
     
     public Covid19Positive?: number;
     public Covid19Negative?: number;

     public AgeGroup?: number;
     public EpiWeek?: number;

     public Male_Screened?: number;
     public Male_Eligible?: number;
     public Male_Enrolled?: number;
     public Female_Screened?: number;
     public Female_Eligible?: number;
     public Female_Enrolled?: number;


}