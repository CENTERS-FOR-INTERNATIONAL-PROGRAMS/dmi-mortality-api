import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19OverallPositivityByFacility extends Model {

  public PositiveNumber?: number;
  public Facility?: string;


}
