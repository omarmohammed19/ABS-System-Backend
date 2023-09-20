import express, { Request, Response } from 'express';
import { EditShipmentsController } from './Controller';

const editShipmentsController = new EditShipmentsController();

const getByAWB = async (req: Request, res: Response) => {
  try {
    const result = await editShipmentsController.getAWBDetailsForDataEntry(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const updateAWB = async (req: Request, res: Response) => {
  try {
    const result = await editShipmentsController.updateAWBDetails(
      String(req.params.AWB) ? String(req.params.AWB) : '',
      req.body.contactPersonID ? req.body.contactPersonID : null,
      req.body.MainAccountID ? req.body.MainAccountID : null,
      req.body.SubAccountID ? req.body.SubAccountID : null,
      req.body.COD ? req.body.COD : null,
      req.body.currentBranchID ? req.body.currentBranchID : null,
      req.body.ProductID ? req.body.ProductID : null,
      req.body.REF ? req.body.REF : null,
      req.body.packageTypeID ? req.body.packageTypeID : null,
      req.body.noOfPCs ? req.body.noOfPCs : null,
      req.body.Length ? req.body.Length : null,
      req.body.Width ? req.body.Width : null,
      req.body.Height ? req.body.Height : null,
      req.body.Content ? req.body.Content : null,
      req.body.specialInstructions ? req.body.specialInstructions : null,
      req.body.creationDate ? req.body.creationDate : null,
      req.body.streetName ? req.body.streetName : null,
      req.body.apartmentNumber ? req.body.apartmentNumber : null,
      req.body.floorNumber ? req.body.floorNumber : null,
      req.body.buildingNumber ? req.body.buildingNumber : null,
      req.body.cityID ? req.body.cityID : null,
      req.body.firstName ? req.body.firstName : null,
      req.body.lastName ? req.body.lastName : null,
      req.body.contactNumbers ? req.body.contactNumbers : null,
      req.body.servicesIDs ? req.body.servicesIDs : null,
      req.body.isActive ? req.body.isActive : null
    );
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const editShipmentsRouter = (app: express.Application) => {
  app.get('/shipment-by-AWB/:AWB', getByAWB);
  app.put('/update-shipment/:AWB', updateAWB);
};

export default editShipmentsRouter;
