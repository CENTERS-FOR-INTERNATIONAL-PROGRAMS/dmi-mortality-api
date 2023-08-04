import { Model, DataTypes, Sequelize } from 'sequelize';

export class EnrollmentByGender extends Model {
     public FemaleNumber?: number;
     public MaleNumber?: number;
}