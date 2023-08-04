import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19PositivityByGender extends Model {

  public PositiveNumber?: number;
  public Gender?: string;


}
