import { CompanyInfo } from './companyInfoModel';
import dotenv from 'dotenv';

dotenv.config();

export interface Register {
  custFirstName: string;
  custLastName: string;
  custMobileNumber: string;
  custMobileTypeID: number;
  custEmailTypeID: number;
  custEmail: string;
  userName: string;
  webUserPassword: string;
  //
  companyName: string;
  mainAccountName: string;
  mainAccountNumber: number;
  productTypeID: number;
  //   custContactFirstName: string;
  //   custContactLastName: string;
  //   custContactPersonTypeID: number;
  salesChannelName: string;
  salesChannelTypeID: number;
  salesChannelURL: string;
  companyMobileNumber: string;
  companyMobileTypeID: number;
  companyEmail: string;
  companyEmailTypeID: number;
  companyAddressTypeID: number;
  companyStreetName: string;
  companyApartmentNumber: number;
  companyFloorNumber: number;
  companyBuildingNumber: number;
  companyCityID: number;
  companyPostalCode: number;
  //
  pickupFirstName: string;
  pickupLastName: string;
  pickupContactPersonTypeID: number;
  pickupMobileNumber1: string;
  pickupMobileTypeID1: number;
  pickupMobileNumber2: string;
  pickupMobileTypeID2: number;
  pickupEmailTypeID: number;
  pickupEmail: string;
  pickupLocationName: string;
  pickupAddressID: number;
  pickupAddressTypeID: number;
  pickupStreetName: string;
  pickupApartmentNumber: number;
  pickupFloorNumber: number;
  pickupBuildingNumber: number;
  pickupCityID: number;
  pickupPostalCode: number;
  //
  returnFirstName: string;
  returnLastName: string;
  returnContactPersonTypeID: number;
  returnMobileNumber1: string;
  returnMobileTypeID1: number;
  returnMobileNumber2: string;
  returnMobileTypeID2: number;
  returnEmailTypeID: number;
  returnEmail: string;
  returnLocationName: string;
  returnAddressID: number;
  returnAddressTypeID: number;
  returnStreetName: string;
  returnApartmentNumber: number;
  returnFloorNumber: number;
  returnBuildingNumber: number;
  returnCityID: number;
  returnPostalCode: number;
  //
  pricePlanID: number;
  //
  paymentMethodID: number;
  mobileNumber: string;
  walletNumber: string;
  walletMobileNumber: string;
  paymentNearestBranchID: number;
  accountHolderName: string;
  accountNumber: string;
  bankNameID: number;
  IBAN: string;
  swiftCode: string;
  //
  //   salesManID: number;
}
