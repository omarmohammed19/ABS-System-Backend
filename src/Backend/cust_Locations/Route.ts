import express, { Request, Response } from 'express';
import { LocationsController } from './Controller';
import { LocationsModel } from './Model';

const locationsController = new LocationsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await locationsController.index(language);
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
    const result = await locationsController.getLocationsByID(Number(req.params.ID),language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const mobileCash = <LocationsModel>{
      locationName: req.body.locationName,
      addressID: req.body.addressID,
    };
    const result = await locationsController.create(mobileCash);
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
    const mobileCash = <LocationsModel>{
        ID: Number(req.params.ID),
        locationName: req.body.locationName,
        addressID: req.body.addressID,
    };
    const result = await locationsController.update(mobileCash,language);
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await locationsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await locationsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const locationsRouter = (app: express.Application) => {
  app.get('/locations', getAll);
  app.get('/locations/:ID', getById);
  app.post('/locations', create);
  app.put('/walletDetails/:ID', update);
  app.put('/locations/deactivate/:ID', deactivate);
  app.put('/locations/activate/:ID', activate);
};

export default locationsRouter;
