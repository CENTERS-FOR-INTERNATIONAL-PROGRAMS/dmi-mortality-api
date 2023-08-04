import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19PositivityByAgeGender extends Model {
     public PositiveNumber?: string;
     public Gender?: number;
     public AgeGroup?: number;
}