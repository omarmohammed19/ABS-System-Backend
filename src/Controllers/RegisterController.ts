import { Register } from './../Models/RegisterModel';
import dotenv from 'dotenv';
import * as sql from 'mssql/msnodesqlv8';
import { sqlConfig } from '../Config/database';
import bcrypt from "bcrypt";

dotenv.config();
const {
  SALT_ROUNDS,
  pepper
} = process.env

export class RegisterController {
  async create(register: Register): Promise<Register[]> {
    try {
      //@ts-ignore
      const hashedPassword = await bcrypt.hashSync(register.webUserPassword + pepper, parseInt(SALT_ROUNDS));
      //@ts-ignore
      const accountNumberHashed = await bcrypt.hashSync(register.accountNumber + pepper, parseInt(SALT_ROUNDS));
      //@ts-ignore
      const IBANHashed = await bcrypt.hashSync(register.IBAN + pepper, parseInt(SALT_ROUNDS));
      //@ts-ignore
      const swiftCodeHashed = await bcrypt.hashSync(register.swiftCode + pepper, parseInt(SALT_ROUNDS));
      //@ts-ignore
      const pool = await new sql.ConnectionPool(sqlConfig).connect();
      const result = await pool
        .request()
        .input('custFirstName', sql.NVarChar, register.custFirstName)
        .input('custLastName', sql.NVarChar, register.custLastName)
        .input('companyName', sql.NVarChar, register.companyName)
        // .input('mainAccountName', sql.NVarChar, register.mainAccountName)
        // .input('mainAccountNumber', sql.Int, register.mainAccountNumber)
        // .input('salesManID', sql.Int, register.salesManID)
        .input('pricePlanID', sql.Int, register.pricePlanID)
        .input('paymentMethodID', sql.Int, register.paymentMethodID)
        .input('productTypeID', sql.Int, register.productTypeID)
        // .input("custContactFirstName", sql.NVarChar, register.custContactFirstName)
        // .input("custContactLastName", sql.NVarChar, register.custContactLastName)
        // .input("custContactPersonTypeID", sql.Int, register.custContactPersonTypeID)
        .input('custMobileNumber', sql.NVarChar, register.custMobileNumber)
        // .input('custMobileTypeID', sql.NVarChar, register.custMobileTypeID)
        // .input('custEmailTypeID', sql.NVarChar, register.custEmailTypeID)
        .input('custEmail', sql.NVarChar, register.custEmail)
        .input('userName', sql.NVarChar, register.userName)
        //@ts-ignore
        .input('webUserPassword', sql.NVarChar, hashedPassword)
        .input('salesChannelName', sql.NVarChar, register.salesChannelName)
        .input('salesChannelTypeID', sql.Int, register.salesChannelTypeID)
        .input('salesChannelURL', sql.NVarChar, register.salesChannelURL)
        .input('companyMobileNumber', sql.NVarChar, register.companyMobileNumber)
        // .input('companyMobileTypeID', sql.Int, register.companyMobileTypeID)
        // .input('companyEmailTypeID', sql.Int, register.companyEmailTypeID)
        .input('companyEmail', sql.NVarChar, register.companyEmail)
        // .input('companyAddressTypeID', sql.Int, register.companyAddressTypeID)
        .input('companyStreetName', sql.NVarChar, register.companyStreetName)
        .input('companyApartmentNumber', sql.Int, register.companyApartmentNumber)
        .input('companyFloorNumber', sql.Int, register.companyFloorNumber)
        .input('companyBuildingNumber', sql.Int, register.companyBuildingNumber)
        .input('companyCityID', sql.Int, register.companyCityID)
        .input('companyPostalCode', sql.Int, register.companyPostalCode)
        .input('nationalID', sql.NVarChar, register.nationalID)
        .input('commercialRegister', sql.NVarChar, register.commercialRegister)
        .input('ServicesIDs', sql.NVarChar, register.ServicesIDs)
        .input('salesChannelsIDs', sql.NVarChar, register.salesChannelsIDs)
        .input('pickupFirstName', sql.NVarChar, register.pickupFirstName)
        .input('pickupLastName', sql.NVarChar, register.pickupLastName)
        // .input('pickupContactPersonTypeID', sql.Int, register.pickupContactPersonTypeID)
        .input('pickupMobileNumber1', sql.NVarChar, register.pickupMobileNumber1)
        // .input('pickupMobileTypeID1', sql.Int, register.pickupMobileTypeID1)
        .input('pickupMobileNumber2', sql.NVarChar, register.pickupMobileNumber2)
        // .input('pickupMobileTypeID2', sql.Int, register.pickupMobileTypeID2)
        // .input('pickupEmailTypeID', sql.Int, register.pickupEmailTypeID)
        .input('pickupEmail', sql.NVarChar, register.pickupEmail)
        .input('pickupLocationName', sql.NVarChar, register.pickupLocationName)
        // .input('pickupAddressID', sql.Int, register.pickupAddressID)
        // .input('pickupAddressTypeID', sql.Int, register.pickupAddressTypeID)
        .input('pickupStreetName', sql.NVarChar, register.pickupStreetName)
        .input('pickupApartmentNumber', sql.Int, register.pickupApartmentNumber)
        .input('pickupFloorNumber', sql.Int, register.pickupFloorNumber)
        .input('pickupBuildingNumber', sql.Int, register.pickupBuildingNumber)
        .input('pickupCityID', sql.Int, register.pickupCityID)
        .input('pickupPostalCode', sql.Int, register.pickupPostalCode)
        .input('returnFirstName', sql.NVarChar, register.returnFirstName)
        .input('returnLastName', sql.NVarChar, register.returnLastName)
        // .input('returnContactPersonTypeID', sql.Int, register.returnContactPersonTypeID)
        .input('returnMobileNumber1', sql.NVarChar, register.returnMobileNumber1)
        // .input('returnMobileTypeID1', sql.Int, register.returnMobileTypeID1)
        .input('returnMobileNumber2', sql.NVarChar, register.returnMobileNumber2)
        // .input('returnMobileTypeID2', sql.Int, register.returnMobileTypeID2)
        // .input('returnEmailTypeID', sql.Int, register.returnEmailTypeID)
        .input('returnEmail', sql.NVarChar, register.returnEmail)
        .input('returnLocationName', sql.NVarChar, register.returnLocationName)
        // .input('returnAddressID', sql.Int, register.returnAddressID)
        // .input('returnAddressTypeID', sql.Int, register.returnAddressTypeID)
        .input('returnStreetName', sql.NVarChar, register.returnStreetName)
        .input('returnApartmentNumber', sql.Int, register.returnApartmentNumber)
        .input('returnFloorNumber', sql.Int, register.returnFloorNumber)
        .input('returnBuildingNumber', sql.Int, register.returnBuildingNumber)
        .input('returnCityID', sql.Int, register.returnCityID)
        .input('returnPostalCode', sql.Int, register.returnPostalCode)
        .input('mobileNumber', sql.NVarChar, register.mobileNumber)
        .input('walletNumber', sql.NVarChar, register.walletNumber)
        .input('walletMobileNumber', sql.NVarChar, register.walletMobileNumber)
        .input('paymentNearestBranchID', sql.Int, register.paymentNearestBranchID)
        .input('accountHolderName', sql.NVarChar, register.accountHolderName)
        .input('accountNumber', sql.NVarChar, accountNumberHashed)
        .input('bankNameID', sql.Int, register.bankNameID)
        .input('IBAN', sql.NVarChar, IBANHashed)
        .input('swiftCode', sql.NVarChar, swiftCodeHashed)
        .execute('[dbo].[p_Register]');
      pool.close();
      return result.recordset;
    } catch (err) {
      throw new Error(`Could not register. Error: ${err}`);
    }
  }
}
