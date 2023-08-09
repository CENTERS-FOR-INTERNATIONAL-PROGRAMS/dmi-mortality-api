import { Model, DataTypes, Sequelize } from 'sequelize';

export class ScreeningByGender extends Model {
     public MaleScreened?: number;
     public FemaleScreened?: number;
     public MaleEligible?: number;
     public FemaleEligible?: number;
     public MaleEnrolled?: number;
     public FemaleEnrolled?: number;
}