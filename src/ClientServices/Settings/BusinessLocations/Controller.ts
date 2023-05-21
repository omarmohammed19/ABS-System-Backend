import { sequelize } from '../../../Config/database';
import Sequelize from 'sequelize';
import { Locations, LocationsModel } from '../../../Backend/cust_Locations/Model';
import { Addresses, AddressesModel } from '../../../Backend/cust_Addresses/Model';
import { ContactNumbers, ContactNumbersModel } from '../../../Backend/cust_ContactNumbers/Model';
import { ContactPersons, ContactPersonsModel } from '../../../Backend/cust_ContactPersons/Model';
import { Emails, EmailsModel } from '../../../Backend/cust_Emails/Model';

export class BusinessLocationsController {
  async addBusinessLocation(address: AddressesModel, location: LocationsModel, contactPerson: ContactPersonsModel, contactNumber : ContactNumbersModel, email: EmailsModel): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {
        // start managed transaction and pass transaction object to the callback function
        const addressDetails = await Addresses.create(
          {
            subAccountID: address.subAccountID,
            streetName: address.streetName,
            apartmentNumber: address.apartmentNumber,
            floorNumber: address.floorNumber,
            buildingNumber: address.buildingNumber,
            cityID: address.cityID,
            postalCode: address.postalCode,
            addressTypeID: address.addressTypeID,
            longitude: address.longitude,
            latitude: address.latitude
          },
          { transaction: t, returning: ['ID'] } // pass transaction object to query
        );

        await Locations.create(
          {
            locationName: location.locationName,
            addressID: addressDetails.ID,
          },
          { transaction: t }
        );

        const contactPersonDetails = await ContactPersons.create(
          {
            subAccountID: contactPerson.subAccountID,
            firstName: contactPerson.firstName,
            lastName: contactPerson.lastName,
            contactPersonTypeID: contactPerson.contactPersonTypeID,
            addressID: addressDetails.ID,
          },
          { transaction: t, returning: ['ID'] }
        );

        await ContactNumbers.create(
          {
            subAccountID: contactNumber.subAccountID,
            contactNumber: contactNumber.contactNumber,
            contactTypeID: contactNumber.contactTypeID,
            numberTypeID: contactNumber.numberTypeID,
            contactPersonID: contactPersonDetails.ID,
          },
          { transaction: t }
        );

        await Emails.create(
          {
            email: email.email,
            emailTypeID: email.emailTypeID,
            contactPersonID: contactPersonDetails.ID,
          },
          { transaction: t }
        );

        return "Business Location Added Successfully";

      });
    } catch (err) {
      throw new Error(`Could not add new CallType. Error: ${err}`);
    }
  }


}