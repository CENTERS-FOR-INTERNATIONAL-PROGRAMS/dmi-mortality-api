import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19ResultsByAgeGender extends Model {
     public Covi19Positive?: number;
     public Covi19Negative?: number;
}