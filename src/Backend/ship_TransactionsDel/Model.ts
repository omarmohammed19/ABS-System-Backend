import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../Config/database';

export interface TransactionsDelModel extends Model {
  ID: number;
  transHdrID: number;
  AWB: string;
  Ref: string;
  mainAccountID: number;
  subAccountID: number;
  serviceID: number;
  shipmentTypeID: number;
  statusID: number;
  actualDeliveryDate: string;
  expectedDeliveryDate: string;
  productID: number;
  creationDate: string;
  runnerID: number;
  lastChangeDate: string;
  userID: number;
  expiryDate: string;
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
  isPaid: boolean;
  paymentDate: string;
  isActive: boolean;
}

export const TransactionsDel = sequelize.define<TransactionsDelModel>(
  'ship_TransactionsDel',
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
    serviceID: {
      type: DataTypes.INTEGER,
    },
    shipmentTypeID: {
      type: DataTypes.INTEGER,
    },
    statusID: {
      type: DataTypes.INTEGER,
    },
    actualDeliveryDate: {
      type: DataTypes.STRING,
    },
    expectedDeliveryDate: {
      type: DataTypes.STRING,
    },
    productID: {
      type: DataTypes.INTEGER,
    },
    creationDate: {
      type: DataTypes.STRING,
    },
    runnerID: {
      type: DataTypes.INTEGER,
    },
    lastChangeDate: {
      type: DataTypes.STRING,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    expiryDate: {
      type: DataTypes.STRING,
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
    isPaid: {
      type: DataTypes.BOOLEAN,
    },
    paymentDate: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
    tableName: 'ship_TransactionsDel',
  }
);
