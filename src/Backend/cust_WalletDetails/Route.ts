import express, { Request, Response } from 'express';
import { WalletDetailsController } from './Controller';
import { WalletDetailsModel } from './Model';

const walletDetailsController = new WalletDetailsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const lang = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await walletDetailsController.index(lang, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const lang = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await walletDetailsController.getWalletDetailsByID(Number(req.params.ID), lang);
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
    const lang = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const mobileCash = <WalletDetailsModel>{
      ID: Number(req.params.ID),
      walletNumber: req.body.walletNumber,
      mobileNumber: req.body.mobileNumber,
    };
    const result = await walletDetailsController.update(mobileCash, lang);
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
  app.get('/wallet-details/:isActive/:limit', getAll);
  app.get('/wallet-details-by-ID/:ID', getById);
  app.post('/wallet-details', create);
  app.put('/wallet-details/:ID', update);
  app.put('/wallet-details/de-activate/:ID', deactivate);
  app.put('/wallet-details/activate/:ID', activate);
};

export default walletDetailsRouter;
