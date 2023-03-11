import express, { Request, Response } from 'express';
import { WalletDetailsController } from './Controller';
import { WalletDetailsModel } from './Model';

const walletDetailsController = new WalletDetailsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await walletDetailsController.index();
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const result = await walletDetailsController.getWalletDetailsByID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const mobileCash = <WalletDetailsModel>{
        walletNumber: req.body.walletNumber,
        mobileNumber: req.body.mobileNumber,
    };
    const result = await walletDetailsController.create(mobileCash);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const mobileCash = <WalletDetailsModel>{
        ID: Number(req.params.ID),
        walletNumber: req.body.walletNumber,
        mobileNumber: req.body.mobileNumber,
    };
    const result = await walletDetailsController.update(mobileCash);
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await walletDetailsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await walletDetailsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const walletDetailsRouter = (app: express.Application) => {
  app.get('/walletDetails', getAll);
  app.get('/walletDetails/:ID', getById);
  app.post('/walletDetails', create);
  app.put('/walletDetails/:ID', update);
  app.put('/walletDetails/deactivate/:ID', deactivate);
  app.put('/walletDetails/activate/:ID', activate);
};

export default walletDetailsRouter;
