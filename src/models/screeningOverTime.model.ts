import { Model, DataTypes, Sequelize } from 'sequelize';

export class screeningOverTime extends Model {

     public Screened?: number;
     public EpiWeek?: number;
     public Month?: number;
     public Year?: number;
}