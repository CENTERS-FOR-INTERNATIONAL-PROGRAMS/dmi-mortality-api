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

     public EnrolledMale?: number;
     public EnrolledFemale?: number;

     public TestedMale?: number;
     public TestedFemale?: number;

     public PositiveMale?: number;
     public PositiveFemale?: number;
}