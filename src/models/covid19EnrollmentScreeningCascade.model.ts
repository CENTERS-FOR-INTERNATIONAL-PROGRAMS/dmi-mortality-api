import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19EnrollmentScreeningCascade extends Model {

  public TotalScreened?: Number;
  public Eligible?: Number;
  public Enrolled?: Number;
  public Tested?: Number;
  public Positive?: Number;

}
