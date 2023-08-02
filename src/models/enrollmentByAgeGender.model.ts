import { Model, DataTypes, Sequelize } from 'sequelize';

export class EnrollmentByAgeGender extends Model {
     public FemaleNumber?: number;
     public MaleNumber?: number;
     public Age?: number;
}