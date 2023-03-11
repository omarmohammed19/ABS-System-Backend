import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface AddressTypesModel extends Model {
    ID: number;
    enAddressType: string;
    arAddressType: string;
    Notes: string;
    isActive: boolean;
}

export const AddressTypes = sequelize.define<AddressTypesModel>(
    'client_AddressTypes',
    {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        enAddressType: {
            type: DataTypes.STRING,
        },
        arAddressType: {
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