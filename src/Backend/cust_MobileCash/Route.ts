import express, { Request, Response } from 'express';
import { MobileCashController } from './Controller';
import { MobileCashModel } from './Model';

const mobileCashController = new MobileCashController();

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await mobileCashController.index();
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const result = await mobileCashController.getMobileCashByID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const mobileCash = <MobileCashModel>{
        mobileNumber: req.body.mobileNumber,
    };
    const result = await mobileCashController.create(mobileCash);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const mobileCash = <MobileCashModel>{
        ID: Number(req.params.ID),
        mobileNumber: req.body.mobileNumber,
    };
    const result = await mobileCashController.update(mobileCash);
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await mobileCashController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await mobileCashController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const mobileCashRouter = (app: express.Application) => {
  app.get('/mobileCash', getAll);
  app.get('/mobileCash/:ID', getById);
  app.post('/mobileCash', create);
  app.put('/mobileCash/:ID', update);
  app.put('/mobileCash/deactivate/:ID', deactivate);
  app.put('/mobileCash/activate/:ID', activate);
};

export default mobileCashRouter;
