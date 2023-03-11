import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface EmployeesModel extends Model {
    ID: number;
    enEmployeeName: string;
    arEmployeeName: string;
    code: number;
    fingerPrintCode: number;
    HRCode: number;
    titleID: number;
    departmentID: number;
    branchID: number;
    hiringDate: Date;
    IDNO: string;
    contactNumberID: number;
    emailID: number;
    addressID: number;
    salaryID: number;
    dateOfBirth: Date;
    genderID: number;
    isActive: boolean;
}

export const Employee = sequelize.define<EmployeesModel>(
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
        code: {
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
        emailID: {
            type: DataTypes.INTEGER,
        },
        addressID: {
            type: DataTypes.INTEGER,
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

