import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface EmployeesModel extends Model {
    ID: number;
    enEmployeeName: string;
    arEmployeeName: string;
    Code: number;
    fingerPrintCode: number;
    HRCode: number;
    userID: number;
    titleID: number;
    departmentID: number;
    branchID: number;
    hiringDate: string;
    IDNO: string;
    Email: string;
    Mobile1: string;
    Mobile2: string;
    Address: string;
    salaryID: number;
    dateOfBirth: string;
    genderID: number;
    isActive: boolean;
}

export const Employees = sequelize.define<EmployeesModel>(
    'cmp_Employees',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enEmployeeName: {
            type: DataTypes.STRING,
        },
        arEmployeeName: {
            type: DataTypes.STRING,
        },
        Code: {
            type: DataTypes.INTEGER,
        },
        fingerPrintCode: {
            type: DataTypes.INTEGER,
        },
        HRCode: {
            type: DataTypes.INTEGER,
        },
        userID: {
            type: DataTypes.INTEGER,
        },
        titleID: {
            type: DataTypes.INTEGER,
        },
        departmentID: {
            type: DataTypes.INTEGER,
        },
        branchID: {
            type: DataTypes.INTEGER,
        },
        hiringDate: {
            type: DataTypes.STRING,
        },
        IDNO: {
            type: DataTypes.STRING,
        },
        Email: {
            type: DataTypes.STRING,
        },
        Mobile1: {
            type: DataTypes.STRING,
        },
        Mobile2: {
            type: DataTypes.STRING,
        },
        Address: {
            type: DataTypes.STRING,
        },
        salaryID: {
            type: DataTypes.INTEGER,
        },
        dateOfBirth: {
            type: DataTypes.STRING,
        },
        genderID: {
            type: DataTypes.INTEGER,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);

