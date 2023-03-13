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

const getByAWB = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await addressesController.getServicesById(String(req.params.AWB), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const service = <AddressesModel>{
      AWB: req.body.AWB,
      subAccountID: req.body.subAccountID,
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      cneeContactPersonID: req.body.cneeContactPersonID,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };
    const result = await addressesController.create(service);
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
    const service = <AddressesModel>{
      AWB: String(req.params.AWB),
      subAccountID: req.body.subAccountID,
      streetName: req.body.streetName,
      apartmentNumber: req.body.apartmentNumber,
      floorNumber: req.body.floorNumber,
      buildingNumber: req.body.buildingNumber,
      cityID: req.body.cityID,
      postalCode: req.body.postalCode,
      cneeContactPersonID: req.body.cneeContactPersonID,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };
    const result = await addressesController.update(service, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await addressesController.deactivate(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await addressesController.activate(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const addressesRouter = (app: express.Application) => {
  app.get('/addresses/:isActive/:limit', getAll);
  app.get('/addresses/:AWB', getByAWB);
  app.post('/addresses', create);
  app.put('/addresses/:AWB', update);
  app.put('/addresses/de-activate/:AWB', deactivate);
  app.put('/addresses/activate/:AWB', activate);
};

export default addressesRouter;
