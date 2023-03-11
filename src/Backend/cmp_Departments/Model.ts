import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface DepartmentsModel extends Model {
    ID: number;
    enDepartmentName: string;
    arDepartmentName: string;
    isActive: boolean;
}

export const Department = sequelize.define<DepartmentsModel>(
    'cmp_Departments',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enDepartmentName: {
            type: DataTypes.STRING,
        },
        arDepartmentName: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);
