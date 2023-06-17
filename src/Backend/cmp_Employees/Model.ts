import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface EmployeesModel extends Model {
    ID: number;
    enEmployeeName: string;
    arEmployeeName: string;
    Code: number;
    fingerPrintCode: number;
    HRCode: number;
    titleID: number;
    departmentID: number;
    branchID: number;
    hiringDate: Date;
    IDNO: string;
    contactNumberID: number;
    Email: string;
    Address: string;
    salaryID: number;
    dateOfBirth: Date;
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
            type: DataTypes.DATE,
        },
        IDNO: {
            type: DataTypes.STRING,
        },
        contactNumberID: {
            type: DataTypes.INTEGER,
        },
        Email: {
            type: DataTypes.STRING,
        },
        Address: {
            type: DataTypes.STRING,
        },
        salaryID: {
            type: DataTypes.INTEGER,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
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

