import { Model, DataTypes, Sequelize } from 'sequelize';

export class ScreeningByHealthFacilities extends Model {

     public Screened?: number;
     public Facility?: string;
}