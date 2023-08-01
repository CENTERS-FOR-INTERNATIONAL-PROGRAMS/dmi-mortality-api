import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19OverTime extends Model {

  public SampleTested?: Number;
  public CovidPositive?: number;
  public EpiWeek?: number;

}
