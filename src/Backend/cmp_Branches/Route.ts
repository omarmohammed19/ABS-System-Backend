import express, { Request, Response } from 'express';
import { BranchesController } from './Controller';
import { BranchesModel } from './Model';

const branchesController = new BranchesController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';

    const result = await branchesController.index(language, Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllAr = async (req: Request, res: Response) => {
  try {
    const language = (req.headers['accept-language'] = 'en');

    const result = await branchesController.indexAr(language, Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await branchesController.getBranchByID(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBranchByCityID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await branchesController.getBranchByCityID(Number(req.params.cityID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const branch = <BranchesModel>{
      enBranchName: req.body.enBranchName,
      arBranchName: req.body.arBranchName,
      cityID: req.body.cityID,
      address: req.body.address,
      location: req.body.location,
    };
    const result = await branchesController.create(branch);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const branch = <BranchesModel>{
      ID: Number(req.params.ID),
      enBranchName: req.body.enBranchName,
      arBranchName: req.body.arBranchName,
      cityID: req.body.cityID,
      address: req.body.address,
      location: req.body.location,
    };
    const result = await branchesController.update(branch, language);
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:43 ~ create ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

const deActivate = async (req: Request, res: Response) => {
  try {
    const result = await branchesController.deActivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await branchesController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const branchesRouter = (app: express.Application) => {
  app.get('/branches/:isActive', getAll);
  app.get('/ar/branches/:isActive', getAllAr);
  app.get('/branches-by-ID/:ID', getById);
  app.get('/branches-by-city-ID/:cityID', getBranchByCityID);
  app.post('/branches', create);
  app.put('/branches/:ID', update);
  app.put('/branches/de-activate/:ID', deActivate);
  app.put('/branches/activate/:ID', activate);
};

export default branchesRouter;
