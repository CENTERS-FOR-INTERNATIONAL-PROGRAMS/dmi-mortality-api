import { Model, DataTypes, Sequelize } from 'sequelize';

export class ScreeningByHealthFacilities extends Model {

     public Screened?: number;
     public Enrolled?: number;
     public Covid19Positive?: number;
     public Facility?: string;
}