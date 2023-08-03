import express, { Request, Response } from 'express';
import { StatusController } from './Controller';
import { StatusModel } from './Model';
import Sequalize from 'sequelize';

const statusController = new StatusController();

const getAllActive = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await statusController.index(language, Number(req.params.isActive));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await statusController.getAll(language);
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
    const result = await statusController.getPrevStatusByID(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const status = <StatusModel>(<unknown>{
      enStatus: req.body.enStatus,
      arStatus: req.body.arStatus,
      custDisplayedStatusID: req.body.custDisplayedStatusID,
      requireReason: req.body.requireReason,
      Notes: req.body.Notes,
    });
    const result = await statusController.create(status);
    res.json(result);
  } catch (error) {
    console.log('🚀 ~ file: Route.ts:43 ~ create ~ error:', error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const status = <StatusModel>(<unknown>{
      ID: req.params.ID,
      enStatus: req.body.enStatus,
      arStatus: req.body.arStatus,
      custDisplayedStatusID: req.body.custDisplayedStatusID,
      requireReason: req.body.requireReason,
      Notes: req.body.Notes,
    });
    const result = await statusController.update(language, status);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await statusController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await statusController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const statusRouter = (app: express.Application) => {
  app.get('/status', getAll);
  app.get('/status/:isActive', getAllActive);
  app.get('/status-by-ID/:ID', getById);
  app.post('/status', create);
  app.put('/status/:ID', update);
  app.put('/status/de-activate/:ID', deactivate);
  app.put('/status/activate/:ID', activate);
};

export default statusRouter;
