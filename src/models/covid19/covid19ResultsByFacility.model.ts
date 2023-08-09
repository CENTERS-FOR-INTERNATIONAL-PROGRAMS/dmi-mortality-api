import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19ResultsByFacility extends Model {
     public Facility?: string;
     public Covi19Positive?: number;
     public Covi19Negative?: number;
}