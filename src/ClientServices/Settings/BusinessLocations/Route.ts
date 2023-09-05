import express, { Request, Response } from 'express';
import { BusinessLocationsController } from './Controller';
import { LocationsModel } from '../../../Backend/cust_Locations/Model';
import { AddressesModel } from '../../../Backend/cust_Addresses/Model';
import { ContactNumbersModel } from '../../../Backend/cust_ContactNumbers/Model';
import { ContactPersonsModel } from '../../../Backend/cust_ContactPersons/Model';
import { EmailsModel } from '../../../Backend/cust_Emails/Model';

const businessLocationsController = new BusinessLocationsController();

const addBusinessLocation = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.body.subAccountID ? req.body.subAccountID : req.subAccountID;
    const address = <AddressesModel>(<unknown>{
      subAccountID: subAccountID,
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      addressTypeID: req.body.addressTypeID,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    });

    const location = <LocationsModel>(<unknown>{
      locationName: req.body.locationName,
    });

    const contactPerson = <ContactPersonsModel>(<unknown>{
      subAccountID: subAccountID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contactPersonTypeID: req.body.contactPersonTypeID,
    });

    const contactNumber = <ContactNumbersModel>(<unknown>{
      subAccountID: subAccountID,
      contactNumber: req.body.contactNumber,
      contactTypeID: req.body.contactTypeID,
      numberTypeID: req.body.numberTypeID,
    });

    const email = <EmailsModel>(<unknown>{
      email: req.body.email,
      emailTypeID: req.body.emailTypeID,
    });

    const response = await businessLocationsController.addBusinessLocation(address, location, contactPerson, contactNumber, email);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const BusinessLocationsRouter = (app: express.Application) => {
  app.post('/business-locations', addBusinessLocation);
};
export default BusinessLocationsRouter;
