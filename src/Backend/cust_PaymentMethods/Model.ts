import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PaymentMethodsModel extends Model {
    ID: number;
    enPaymentMethodType: string;
    arPaymentMethodType: string;
    Notes: string;
    isActive: boolean;
}

export const PaymentMethods = sequelize.define<PaymentMethodsModel>(
    'cust_PaymentMethods',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enPaymentMethodType: {
            type: DataTypes.STRING,
        },
        arPaymentMethodType: {
            type: DataTypes.STRING,
        },
        Notes: {
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
