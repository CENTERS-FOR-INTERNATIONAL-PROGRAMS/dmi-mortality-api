import { Model, DataTypes, Sequelize } from 'sequelize';

export class ScreeningByGender extends Model { 

     public FemaleNumber? : number;
     public MaleNumber? : number;
}