import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PickupsModel extends Model {
  ID: number;
  mainAccountID: number;
  subAccountID: number;
  pickupLocationID: number;
  transHdrID: number;
  pickupTypeID: number;
  vehicleTypeID: number;
  noOfAWBs: number;
  actualAWBs: number;
  pickedUpDate: Date;
  timeFrom: Date;
  toTime: Date;
  statusID: number;
  userID: number;
  creationDate: Date;
  assignedBy: number;
  assignedTo: number;
  createdAWBs: number;
  Notes: string;
  isActive: boolean;
}

export const Pickups = sequelize.define<PickupsModel>(
  'ship_Pickups',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mainAccountID: {
      type: DataTypes.INTEGER,
    },
    subAccountID: {
      type: DataTypes.INTEGER,
    },
    pickupLocationID: {
      type: DataTypes.INTEGER,
    },
    transHdrID: {
      type: DataTypes.INTEGER,
    },
    pickupTypeID: {
      type: DataTypes.INTEGER,
    },
    vehicleTypeID: {
      type: DataTypes.INTEGER,
    },
    noOfAWBs: {
      type: DataTypes.INTEGER,
    },
    actualAWBs: {
      type: DataTypes.INTEGER,
    },
    pickedUpDate: {
      type: DataTypes.DATE,
    },
    timeFrom: {
      type: DataTypes.DATE,
    },
    toTime: {
      type: DataTypes.DATE,
    },
    statusID: {
      type: DataTypes.INTEGER,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    creationDate: {
      type: DataTypes.DATE,
    },
    assignedBy: {
      type: DataTypes.INTEGER,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
    },
    createdAWBs: {
      type: DataTypes.INTEGER,
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
