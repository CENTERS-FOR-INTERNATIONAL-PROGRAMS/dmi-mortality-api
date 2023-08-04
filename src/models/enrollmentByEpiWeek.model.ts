import { Model, DataTypes, Sequelize } from 'sequelize';

export class EnrollmentByEpiWeek extends Model {
     public NumberEnrolled?: number;
     public PercentEnrolled?: number;
     public EpiWeek?: number;
}