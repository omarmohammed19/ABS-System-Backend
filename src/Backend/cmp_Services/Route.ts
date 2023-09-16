import express, { Request, Response } from 'express';
import { CompanyServicesController } from './Controller';
import { CompanyServicesModel } from './Model';

const companyServicesController = new CompanyServicesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await companyServicesController.index(language, Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await companyServicesController.getPackageTypeById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const packageType = <CompanyServicesModel>{
      enService: req.body.enService,
      arService: req.body.arService,
      Notes: req.body.Notes,
    };
    const result = await companyServicesController.create(packageType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const packageType = <CompanyServicesModel>{
      ID: Number(req.params.ID),
      enService: req.body.enService,
      arService: req.body.arService,
      Notes: req.body.Notes,
    };
    const result = await companyServicesController.update(packageType);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await companyServicesController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await companyServicesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const cmpservicesRouter = (app: express.Application) => {
  app.get('/services/:isActive', getAll);
  app.get('/services/:ID', getById);
  app.post('/services', create);
  app.put('/services/:ID', update);
  app.put('/services/de-activate/:ID', deactivate);
  app.put('/services/activate/:ID', activate);
};

export default cmpservicesRouter;
