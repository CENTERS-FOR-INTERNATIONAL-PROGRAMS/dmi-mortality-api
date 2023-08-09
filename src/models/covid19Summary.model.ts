import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19Summary extends Model {
  public TotalScreened?: Number;
  public TotalScreenedLastMonth?: Number;

  public Eligible?: Number;
  public PercentEligible?: Number;
  public EligibleLastMonth?: Number;

  public Enrolled?: Number;
  public PercentEnrolled?: Number;
  public EnrolledLastMonth?: Number;

  public Tested?: Number;
  public PercentPositive?: Number;
  public TestedLastMonth?: Number;

  public Positive?: Number;
  public PositiveLastMonth?: Number;

}
