import { Model, DataTypes, Sequelize } from 'sequelize';

export class Covid19Results extends Model {
     public Facility?: string;
     public Gender?: string;
     public AgeGroup?: string;
     public SampleTested?: number;
     public Covid19Positive?: number;
     public Covid19Negative?: number;
     public EpiWeek?: number;
     public Month?: number;
     public Year?: number;
}