import express, { Request, Response } from 'express';
import { BusinessInfoController } from './Controller';
import { AddressesModel } from '../../../Backend/cust_Addresses/Model';
import { companyDataModel } from '../../../Backend/cmp_CompanyData/Model';
import { SalesChannelsModel } from '../../../Backend/cust_SalesChannels/Model';

const businessInfoController = new BusinessInfoController();

const addBusinessInfo = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const cmpInfo = <companyDataModel>(<unknown>{
      enCompanyName: req.body.enCompanyName,
      arCompanyName: req.body.arCompanyName,
    });

    //@ts-ignore
    const mainAccountID = req.mainAccountID;
    const salesChannel = <SalesChannelsModel>(<unknown>{
      salesChannelName: req.body.salesChannelName,
      salesChannelURL: req.body.salesChannelURL,
      salesChannelTypeID: req.body.salesChannelTypeID,
    });

    const address = <AddressesModel>(<unknown>{
      subAccountID: subAccountID,
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      addressTypeID: 1,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    });

    const productTypeID = req.body.productTypeID;
    const prefix = req.body.prefix;
    const serviceTypesIDs = req.body.serviceTypesIDs;
    const nationalID = req.body.nationalID;
    const commercialRegister = req.body.commercialRegister;

    const response = await businessInfoController.addBusinessInfo(cmpInfo, mainAccountID, salesChannel, address, productTypeID, prefix, serviceTypesIDs, nationalID, commercialRegister);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const getCompanyInfo = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;

    const response = await businessInfoController.getCompanyInfo(subAccountID);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const BusinessInfoRouter = (app: express.Application) => {
  app.post('/business-info', addBusinessInfo);
  app.get('/business-info', getCompanyInfo);

};
export default BusinessInfoRouter;
