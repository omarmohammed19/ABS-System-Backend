import express, { Request, Response } from 'express';
import { ReasonsController } from './Controller';
import { ReasonsModel } from './Model';

const reasonsController = new ReasonsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await reasonsController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await reasonsController.getReasonById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const reason = <ReasonsModel>{
      enReason: req.body.enReason,
      arReason: req.body.arReason,
      Notes: req.body.Notes,
    };
    const result = await reasonsController.create(reason);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const reason = <ReasonsModel>{
      ID: Number(req.params.ID),
      enReason: req.body.enReason,
      arReason: req.body.arReason,
      Notes: req.body.Notes,
    };
    const result = await reasonsController.update(reason);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await reasonsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await reasonsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const reasonsRouter = (app: express.Application) => {
  app.get('/reasons', getAll);
  app.get('/reasons/:ID', getById);
  app.post('/reasons', create);
  app.put('/reasons/:ID', update);
  app.put('/reasons/deactivate/:ID', deactivate);
  app.put('/reasons/activate/:ID', activate);
};

export default reasonsRouter;
