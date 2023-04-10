import express, { Request, Response } from 'express';
import { AddressesController } from './Controller';
import { AddressesModel } from './Model';

const addressesController = new AddressesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await addressesController.index(language, Number(req.params.limit), Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const getByID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await addressesController.getAddressesByID(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const Addresses = <AddressesModel>{
      subAccountID: req.body.subAccountID,
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };
    const result = await addressesController.create(Addresses);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const Addresses = <AddressesModel>{
      ID: Number(req.params.ID),
      subAccountID: req.body.subAccountID,
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };
    const result = await addressesController.update(Addresses, language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await addressesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await addressesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const custAddressesRouter = (app: express.Application) => {
  app.get('/cust-addresses/:isActive/:limit', getAll);
  app.get('/cust-addresses-by-id/:ID', getByID);
  app.post('/cust-addresses', create);
  app.put('/cust-addresses/:ID', update);
  app.put('/cust-addresses/de-activate/:ID', deactivate);
  app.put('/cust-addresses/activate/:ID', activate);
};

export default custAddressesRouter;
