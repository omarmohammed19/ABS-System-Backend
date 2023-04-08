import express, { Request, Response } from 'express';
import { ZonesController } from './Controller';
import { ZonesModel } from './Model';

const zonesController = new ZonesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await zonesController.index(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await zonesController.getZonesById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBySubAccountId = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await zonesController.getZonesBySubAccountId(Number(req.params.subAccountID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const service = <ZonesModel>{
      subAccountID: req.body.subAccountID,
      cityID: req.body.cityID,
      zoneID: req.body.zoneID,
    };
    const result = await zonesController.create(service);
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
    const service = <ZonesModel>{
      ID: Number(req.params.ID),
      subAccountID: req.body.subAccountID,
      cityID: req.body.cityID,
      zoneID: req.body.zoneID,
    };
    const result = await zonesController.update(service, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await zonesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await zonesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const custzonesRouter = (app: express.Application) => {
  app.get('/cust-zones/:isActive/:limit', getAll);
  app.get('/cust-zones-by-ID/:ID', getById);
  app.get('/cust-zones-by-sub-account-ID/:subAccountID', getBySubAccountId);
  app.post('/cust-zones', create);
  app.put('/cust-zones/:ID', update);
  app.put('/cust-zones/de-activate/:ID', deactivate);
  app.put('/cust-zones/activate/:ID', activate);
};

export default custzonesRouter;
