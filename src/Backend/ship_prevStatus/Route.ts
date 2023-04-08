import express, { Request, Response } from 'express';
import { PrevStatusController } from './Controller';
import { PrevStatusModel } from './Model';
import Sequalize from 'sequelize';

const prevStatusController = new PrevStatusController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await prevStatusController.index(language, Number(req.params.isActive));
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
    const result = await prevStatusController.getPrevStatusByID(Number(req.params.statusID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const prevStatus = <PrevStatusModel>(<unknown>{
      statusID: req.body.statusID,
      prevStatusID: req.body.prevStatusID,
    });
    const result = await prevStatusController.create(prevStatus);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const prevStatus = <PrevStatusModel>(<unknown>{
      ID: req.params.ID,
      statusID: req.body.statusID,
      prevStatusID: req.body.prevStatusID,
    });
    const result = await prevStatusController.update(language, prevStatus);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await prevStatusController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await prevStatusController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const prevStatusRouter = (app: express.Application) => {
  app.get('/prev-status/:isActive', getAll);
  app.get('/prev-status-by-ID/:statusID', getById);
  app.post('/prev-status', create);
  app.put('/prev-status/:ID', update);
  app.put('/prev-status/deactivate/:ID', deactivate);
  app.put('/prev-status/activate/:ID', activate);
};

export default prevStatusRouter;
