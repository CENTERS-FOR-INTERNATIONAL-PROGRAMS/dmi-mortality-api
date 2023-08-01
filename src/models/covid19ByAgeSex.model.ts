import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19ByAgeSex extends Model {

  public CovidPositive?: Number;
  public AgeGroup?: number;
  public Sex?: number;

}
