import express, { Request, Response } from 'express';
import { MobileCashController } from './Controller';
import { MobileCashModel } from './Model';

const mobileCashController = new MobileCashController();

const getAll = async (req: Request, res: Response) => {
  try {
    const lang = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await mobileCashController.index(lang, Number(req.params.isActive), Number(req.params.limit));
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
    const result = await mobileCashController.getMobileCashByID(Number(req.params.ID), lang);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBySubAccountID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const result = await mobileCashController.getMobileCashBySubAccountID(subAccountID);
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
    const lang = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const mobileCash = <MobileCashModel>{
      ID: Number(req.params.ID),
      mobileNumber: req.body.mobileNumber,
    };
    const result = await mobileCashController.update(mobileCash, lang);
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
  app.get('/mobile-cash/:isActive/:limit', getAll);
  app.get('/mobile-cash-by-ID/:ID', getById);
  app.get('/mobile-cash-by-sub-account-ID', getBySubAccountID);
  app.post('/mobile-cash', create);
  app.put('/mobile-cash/:ID', update);
  app.put('/mobile-cash/de-activate/:ID', deactivate);
  app.put('/mobile-cash/activate/:ID', activate);
};

export default mobileCashRouter;
