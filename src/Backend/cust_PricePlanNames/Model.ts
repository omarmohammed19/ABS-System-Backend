import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PricePlanNamesModel extends Model {
    ID: number;
    enPricePlanName: string;
    arPricePlanName: string;
    pricePlanID: number;
    numberOfShipments: number;
    collectionStart: number,
    collectionIncrement: number,
    collectionFees: number,
    basicPlan: boolean,
    defaultPlan: boolean,
    Notes: string,
    isActive: boolean;
}

export const PricePlanNames = sequelize.define<PricePlanNamesModel>(
    'cust_PricePlanNames',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enPricePlanName: {
            type: DataTypes.STRING,
        },
        arPricePlanName: {
            type: DataTypes.STRING,
        },
        pricePlanID: {
            type: DataTypes.INTEGER,
        },
        numberOfShipments: {
            type: DataTypes.INTEGER,
        },
        collectionStart: {
            type: DataTypes.INTEGER,
        },
        collectionIncrement: {
            type: DataTypes.INTEGER,
        },
        collectionFees: {
            type: DataTypes.INTEGER,
        },
        basicPlan: {
            type: DataTypes.BOOLEAN,
        },
        defaultPlan: {
            type: DataTypes.BOOLEAN,
        },
        Notes: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        }
    },
    {
        timestamps: false
    }
);
