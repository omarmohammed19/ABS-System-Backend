import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface AddressesModel extends Model {
    ID: number;
    subAccountID: number;
    streetName: string;
    apartmentNumber: string;
    floorNumber: string;
    buildingNumber: string;
    cityID: number;
    postalCode: string;
    addressTypeID: number;
    longitude: number;
    latitude: number;
    isActive: boolean;
}

export const Addresses = sequelize.define<AddressesModel>(
    'cust_Addresses',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subAccountID: {
            type: DataTypes.INTEGER,
        },
        streetName: {
            type: DataTypes.STRING,
        },
        apartmentNumber: {
            type: DataTypes.STRING,
        },
        floorNumber: {
            type: DataTypes.STRING,
        },
        buildingNumber: {
            type: DataTypes.STRING,
        },
        cityID: {
            type: DataTypes.INTEGER,
        },
        postalCode: {
            type: DataTypes.STRING,
        },
        addressTypeID: {
            type: DataTypes.INTEGER,
        },
        longitude: {
            type: DataTypes.DECIMAL,
        },
        latitude: {
            type: DataTypes.DECIMAL,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        timestamps: false,
    }
);