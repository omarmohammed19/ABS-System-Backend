import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TransactionsModel extends Model {
  ID: number;
  transHdrID: number;
  AWB: string;
  Ref: string;
  mainAccountID: number;
  subAccountID: number;
  shipmentTypeID: number;
  statusID: number;
  actualDeliveryDate: Date;
  expectedDeliveryDate: Date;
  productID: number;
  creationDate: Date;
  runnerID: number;
  lastChangeDate: Date;
  userID: number;
  expiryDate: Date;
  deliveryBranchID: number;
  fromBranchID: number;
  toBranchID: number;
  currentBranchID: number;
  specialInstructions: string;
  IDNO: string;
  recipientID: number;
  recipientName: string;
  packageTypeID: number;
  noOfPcs: number;
  contents: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  actualWeight: number;
  Cash: number;
  collectedFromRunner: boolean;
  collectedFromBranch: boolean;
  isActive: boolean;
}

export const Transactions = sequelize.define<TransactionsModel>(
  'ship_Transactions',
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    transHdrID: {
      type: DataTypes.INTEGER,
    },
    AWB: {
      type: DataTypes.STRING,
    },
    Ref: {
      type: DataTypes.STRING,
    },
    mainAccountID: {
      type: DataTypes.INTEGER,
    },
    subAccountID: {
      type: DataTypes.INTEGER,
    },
    shipmentTypeID: {
      type: DataTypes.INTEGER,
    },
    statusID: {
      type: DataTypes.INTEGER,
    },
    actualDeliveryDate: {
      type: DataTypes.INTEGER,
    },
    expectedDeliveryDate: {
      type: DataTypes.DATE,
    },
    productID: {
      type: DataTypes.INTEGER,
    },
    creationDate: {
      type: DataTypes.INTEGER,
    },
    runnerID: {
      type: DataTypes.INTEGER,
    },
    lastChangeDate: {
      type: DataTypes.INTEGER,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
    deliveryBranchID: {
      type: DataTypes.INTEGER,
    },
    fromBranchID: {
      type: DataTypes.INTEGER,
    },
    toBranchID: {
      type: DataTypes.INTEGER,
    },
    currentBranchID: {
      type: DataTypes.INTEGER,
    },
    specialInstructions: {
      type: DataTypes.STRING,
    },
    IDNO: {
      type: DataTypes.STRING,
    },
    recipientID: {
      type: DataTypes.INTEGER,
    },
    recipientName: {
      type: DataTypes.STRING,
    },
    packageTypeID: {
      type: DataTypes.INTEGER,
    },
    noOfPcs: {
      type: DataTypes.INTEGER,
    },
    contents: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    length: {
      type: DataTypes.INTEGER,
    },
    width: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    actualWeight: {
      type: DataTypes.INTEGER,
    },
    Cash: {
      type: DataTypes.INTEGER,
    },
    collectedFromRunner: {
      type: DataTypes.BOOLEAN,
    },
    collectedFromBranch: {
      type: DataTypes.BOOLEAN,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);
