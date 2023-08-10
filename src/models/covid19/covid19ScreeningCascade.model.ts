import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19ScreeningCascade extends Model {
     public TotalScreened?: string;
     public Eligible?: string;
     public Enrolled?: string;
}