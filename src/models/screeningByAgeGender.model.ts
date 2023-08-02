import { Model, DataTypes, Sequelize } from 'sequelize';

export class ScreeningByAgeGender extends Model {

     public FemaleNumber?: number;
     public MaleNumber?: number;
     public Age?: number;
}