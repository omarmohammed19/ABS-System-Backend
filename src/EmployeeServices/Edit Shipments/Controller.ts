import { sequelize } from '../../Config/database';
import Sequelize, { Transaction } from 'sequelize';

const getByAWB = async (AWB: string, t: Transaction) => {
  const query = `EXEC [dbo].[p_GET_AWBDetailsForDataEntry] @Method = 'GET' , @AWB=:AWB `;
  const replacements = { AWB: AWB };
  const options = { replacements: replacements, type: Sequelize.QueryTypes.SELECT, transaction: t };
  const result = await sequelize.query(query, options);
  return result as unknown as any;
};

const updateAWBDetails = async (
  AWB: string,
  contactPersonID: number | null,
  MainAccountID: number | null,
  SubAccountID: number | null,
  COD: number | null,
  currentBranchID: number | null,
  ProductID: number | null,
  REF: string | null,
  packageTypeID: number | null,
  noOfPCs: number | null,
  Length: number | null,
  Width: number | null,
  Height: number | null,
  Content: string | null,
  specialInstructions: string | null,
  creationDate: Date | null,
  streetName: string | null,
  apartmentNumber: string | null,
  floorNumber: string | null,
  buildingNumber: string | null,
  cityID: number | null,
  firstName: string | null,
  lastName: string | null,
  contactNumbers: string | null,
  servicesIDs: string | null,
  isActive: boolean | null,
  t: Transaction
) => {
  const query = `
    EXEC [dbo].[p_UPDATE_AWB_Details]
      @AWB=:AWB,
      @contactPersonID=:contactPersonID,
      @MainAccountID=:MainAccountID,
      @SubAccountID=:SubAccountID,
      @COD=:COD,
      @currentBranchID=:currentBranchID,
      @ProductID=:ProductID,
      @REF=:REF,
      @packageTypeID=:packageTypeID,
      @noOfPCs=:noOfPCs,
      @Length=:Length,
      @Width=:Width,
      @Height=:Height,
      @Content=:Content,
      @specialInstructions=:specialInstructions,
      @creationDate=:creationDate,
      @streetName=:streetName,
      @apartmentNumber=:apartmentNumber,
      @floorNumber=:floorNumber,
      @buildingNumber=:buildingNumber,
      @cityID=:cityID,
      @firstName=:firstName,
      @lastName=:lastName,
      @contactNumbers=:contactNumbers,
      @servicesIDs=:servicesIDs,
      @isActive=:isActive
  `;

  const replacements = {
    AWB,
    contactPersonID,
    MainAccountID,
    SubAccountID,
    COD,
    currentBranchID,
    ProductID,
    REF,
    packageTypeID,
    noOfPCs,
    Length,
    Width,
    Height,
    Content,
    specialInstructions,
    creationDate,
    streetName,
    apartmentNumber,
    floorNumber,
    buildingNumber,
    cityID,
    firstName,
    lastName,
    contactNumbers,
    servicesIDs,
    isActive,
  };

  const options = {
    replacements,
    type: Sequelize.QueryTypes.UPDATE,
    transaction: t,
  };

  try {
    const result = await sequelize.query(query, options);
    return result as unknown as any;
  } catch (error) {
    throw new Error(`Error updating AWB details: ${error}`);
  }
};

export class EditShipmentsController {
  async getAWBDetailsForDataEntry(AWB: string): Promise<any | string[]> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const item = await getByAWB(AWB, t); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not get Shipment by AWB. Error: ${err}`);
    }
  }

  async updateAWBDetails(
    AWB: string,
    contactPersonID: number | null,
    MainAccountID: number | null,
    SubAccountID: number | null,
    COD: number | null,
    currentBranchID: number | null,
    ProductID: number | null,
    REF: string | null,
    packageTypeID: number | null,
    noOfPCs: number | null,
    Length: number | null,
    Width: number | null,
    Height: number | null,
    Content: string | null,
    specialInstructions: string | null,
    creationDate: Date | null,
    streetName: string | null,
    apartmentNumber: string | null,
    floorNumber: string | null,
    buildingNumber: string | null,
    cityID: number | null,
    firstName: string | null,
    lastName: string | null,
    contactNumbers: string | null,
    servicesIDs: string | null,
    isActive: boolean | null
  ): Promise<any | string[]> {
    try {
      const result = await sequelize.transaction(async (t) => {
        const item = await updateAWBDetails(
          AWB,
          contactPersonID,
          MainAccountID,
          SubAccountID,
          COD,
          currentBranchID,
          ProductID,
          REF,
          packageTypeID,
          noOfPCs,
          Length,
          Width,
          Height,
          Content,
          specialInstructions,
          creationDate,
          streetName,
          apartmentNumber,
          floorNumber,
          buildingNumber,
          cityID,
          firstName,
          lastName,
          contactNumbers,
          servicesIDs,
          isActive,
          t
        ); // pass transaction object to getById function
        return item;
      });
      return result;
    } catch (err) {
      throw new Error(`Could not update AWB details. Error: ${err}`);
    }
  }
}
