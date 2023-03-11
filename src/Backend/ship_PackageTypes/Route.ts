import express, { Request, Response } from 'express';
import { PackageTypesController } from './Controller';
import { PackageTypesModel } from './Model';

const packageTypesController = new PackageTypesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await packageTypesController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await packageTypesController.getPackageTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const packageType = <PackageTypesModel>{
      enPackageType: req.body.enPackageType,
      arPackageType: req.body.arPackageType,
      Notes: req.body.Notes,
    };
    const result = await packageTypesController.create(packageType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const packageType = <PackageTypesModel>{
      ID: Number(req.params.ID),
      enPackageType: req.body.enPackageType,
      arPackageType: req.body.arPackageType,
      Notes: req.body.Notes,
    };
    const result = await packageTypesController.update(packageType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await packageTypesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await packageTypesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const packageTypesRouter = (app: express.Application) => {
  app.get('/packageTypes', getAll);
  app.get('/packageTypes/:ID', getById);
  app.post('/packageTypes', create);
  app.put('/packageTypes/:ID', update);
  app.put('/packageTypes/deactivate/:ID', deactivate);
  app.put('/packageTypes/activate/:ID', activate);
};

export default packageTypesRouter;
