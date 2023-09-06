import express, { Request, Response } from 'express';
import { LocationsController } from './Controller';
import { LocationsModel } from './Model';

const locationsController = new LocationsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await locationsController.index(language, Number(req.params.isActive), Number(req.params.limit));
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
    const result = await locationsController.getLocationsByID(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getBySubAccountId = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await locationsController.getLocationsBySubAccountID(language, Number(req.params.subAccountID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getByIdToEdit = async (req: Request, res: Response) => {
  try {
    const result = await locationsController.getByIdToEdit(Number(req.params.locationID));
    res.json(result);
  } catch (error) {
    
    res.status(400);
    res.json(error);
  }
}

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
    const result = await locationsController.update(mobileCash, language);
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
  app.get('/locations/:isActive/:limit', getAll);
  app.get('/locations-by-ID/:ID', getById);
  app.get('/locations-by-ID-to-edit/:locationID', getByIdToEdit);
  app.get('/locations-by-sub-account-ID/:subAccountID', getBySubAccountId);
  app.post('/locations', create);
  app.put('/locations/:ID', update);
  app.put('/locations/de-activate/:ID', deactivate);
  app.put('/locations/activate/:ID', activate);
};

export default locationsRouter;
