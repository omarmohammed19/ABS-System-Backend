import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface PickupsModel extends Model {
  ID: number;
  mainAccountID: number;
  subAccountID: number;
  pickupLocationID: number;
  returnLocationID: number;
  branchID: number;
  transHdrID: number;
  pickupTypeID: number;
  vehicleTypeID: number;
  noOfAWBs: number;
  actualAWBs: number;
  pickedUpDate: string;
  timeFrom: string;
  toTime: string;
  statusID: number;
  userID: number;
  creationDate: string;
  assignedBy: number;
  assignedTo: number;
  createdAWBs: boolean;
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
    returnLocationID: {
      type: DataTypes.INTEGER,
    },
    branchID: {
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
      type: DataTypes.STRING,
    },
    timeFrom: {
      type: DataTypes.STRING,
    },
    toTime: {
      type: DataTypes.STRING,
    },
    statusID: {
      type: DataTypes.INTEGER,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    creationDate: {
      type: DataTypes.STRING,
    },
    assignedBy: {
      type: DataTypes.INTEGER,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
    },
    createdAWBs: {
      type: DataTypes.BOOLEAN,
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
