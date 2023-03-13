import express, { Request, Response } from 'express';
import { InfoController } from './Controller';
import { InfoModel } from './Model';

const infoController = new InfoController();

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await infoController.index();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllDeActivated = async (req: Request, res: Response) => {
  try {
    const result = await infoController.indexDeActivated();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const result = await infoController.getInfoByID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const info = <InfoModel>{
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const result = await infoController.create(info);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const info = <InfoModel>{
      ID: Number(req.params.ID),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const result = await infoController.update(info);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await infoController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await infoController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const InfoRouter = (app: express.Application) => {
  app.get('/customer-info', getAll);
  app.get('/customer-info/de-activated', getAllDeActivated);
  app.get('/customer-info/:ID', getById);
  app.post('/customer-info', create);
  app.put('/customer-info/:ID', update);
  app.put('/customer-info/de-activate/:ID', deactivate);
  app.put('/customer-info/activate/:ID', activate);
};

export default InfoRouter;
