import express, { Request, Response } from 'express';
import { ShipmentsController } from './Controller';

const shipmentsController = new ShipmentsController();

const getByTransHdrID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await shipmentsController.getTransactionsByTransHdrID(Number(req.params.transHdrID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBymainAccountID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const mainAccountID = req.mainAccountID
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await shipmentsController.getTransactionsBymainAccountID(mainAccountID, language, Number(req.params.limit));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBysubAccountID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await shipmentsController.getTransactionsBysubAccountID(subAccountID, language, Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getByAWB = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await shipmentsController.getTransactionsByAWB(String(req.params.AWB), language, subAccountID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const shipmentsRouter = (app: express.Application) => {
  app.get('/transactions-for-client-by-transHdrID/:transHdrID', getByTransHdrID);
  app.get('/transactions-for-client-by-AWB/:AWB', getByAWB);
  app.get('/transactions-for-client-by-mainAccountID/:limit?', getBymainAccountID);
  app.get('/transactions-for-client-by-subAccountID/:limit?', getBysubAccountID);
};

export default shipmentsRouter;
