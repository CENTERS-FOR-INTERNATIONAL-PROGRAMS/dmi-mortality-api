import { Model, DataTypes, Sequelize } from 'sequelize';

export class EnrollmentByFacility extends Model {
     public NumberEnrolled?: number;
     public PercentEnrolled?: number;
     public HealthFacility?: number;
}