import { Model, DataTypes, Sequelize } from 'sequelize';

export class NumberEnrolled extends Model {

  public id?: string;
  public enrolled?: number;
  public covid19Positive?: number;

}
