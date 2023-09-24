import { sequelize } from '../../../Config/database';
import Sequelize from 'sequelize';
import { Locations, LocationsModel } from '../../../Backend/cust_Locations/Model';
import { Addresses, AddressesModel } from '../../../Backend/cust_Addresses/Model';
import { ContactNumbers, ContactNumbersModel } from '../../../Backend/cust_ContactNumbers/Model';
import { ContactPersons, ContactPersonsModel } from '../../../Backend/cust_ContactPersons/Model';
import { Emails, EmailsModel } from '../../../Backend/cust_Emails/Model';
import admin from 'firebase-admin';
import serviceAccount from '../../../Notifications/serviceAccountKey.json';


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount
  ),
});

export class BusinessLocationsController {
  async addBusinessLocation(address: AddressesModel, location: LocationsModel, contactPerson: ContactPersonsModel, contactNumber: ContactNumbersModel, email: EmailsModel): Promise<any> {
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

  async editBusinessLocation(location: LocationsModel, address: AddressesModel, contactPerson: ContactPersonsModel, contactNumber: ContactNumbersModel, email: EmailsModel): Promise<any> {
    try {
      return await sequelize.transaction(async (t) => {

        const updatedLocation = await Locations.update(
          {
            locationName: location.locationName
          },
          {
            where: {
              ID: location.ID
            },
            transaction: t,
            returning: ['addressID']
          }
        );

        const updatedAddress = await Addresses.update(
          {
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
          {
            where: {
              ID: updatedLocation[1][0].addressID
            },
            transaction: t,
            returning: ['ID']
          }
        );

        const updatedContactPerson = await ContactPersons.update(
          {
            firstName: contactPerson.firstName,
            lastName: contactPerson.lastName,
            contactPersonTypeID: address.addressTypeID
          },
          {
            where: {
              addressID: updatedAddress[1][0].ID
            },
            transaction: t,
            returning: ['ID']
          }
        );

        await ContactNumbers.update(
          {
            contactNumber: contactNumber.contactNumber,
            contactTypeID: address.addressTypeID,
            numberTypeID: 1
          },
          {
            where: {
              contactPersonID: updatedContactPerson[1][0].ID
            },
            transaction: t
          }
        );

        await Emails.update(
          {
            email: email.email,
            emailTypeID: address.addressTypeID
          },
          {
            where: {
              contactPersonID: updatedContactPerson[1][0].ID
            },
            transaction: t
          }
        );

        const userFCMToken = 'cFC6CpsvTAefR5UYxeZ6QH:APA91bE4JQROHYYyxOndsBj5AnHhP-lTNQ00BKfe5KaXM6hogX45lER5VjyQxF4c9o9dnE1hWkr0J2GBCRn8nw47reigmpszadMf1TkS6mJqGFUi5SVYll0ban3exgNu-S4UchgXHBBf';
        const notificationPayload = {
          notification: {
            title: 'Business Location Updated',
            body: 'Your business location has been updated successfully.',
          },
          data: {
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
            sound: 'default',
            status: 'done',
            screen: 'AddNewLocationPage',
            locationID: location.ID.toString(),
          },
        };
        
        await admin.messaging().sendToDevice(userFCMToken, notificationPayload);
        
        return "Business Location Edited Successfully";

      });
    } catch (err) {
      console.log(err);

      throw new Error(`Could not edt Business Location. Error: ${err}`);
    }
  }


}