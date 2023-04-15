import express, { Request, Response } from 'express';
import { TransactionHdrController } from './Controller';
import { TransactionHdrModel } from './Model';
import Sequalize from 'sequelize';

const transactionHdrController = new TransactionHdrController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionHdrController.index(language, Number(req.params.isActive), Number(req.params.limit));
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
    const result = await transactionHdrController.getTransactionHdrByID(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    console.log('ID:' + error);
    res.status(400);
    res.json(error);
  }
};

const getBySubAccountId = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionHdrController.getTransactionHdrBySubAccountID(Number(req.params.subAccountID), language, Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log('subID:' + error);
    res.status(400);
    res.json(error);
  }
};

const getByMainAccountId = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionHdrController.getTransactionHdrByMainAccountID(Number(req.params.mainAccountID), language, Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log('mainID:' + error);
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const transactionHdr = <TransactionHdrModel>(<unknown>{
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      userID: req.body.userID,
      creationDate: currentDate,
      noOfAWBs: req.body.noOfAWBs,
    });

    const result = await transactionHdrController.create(transactionHdr);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const transactionHdr = <TransactionHdrModel>(<unknown>{
      ID: req.params.ID,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      userID: req.body.userID,
      creationDate: currentDate,
      noOfAWBs: req.body.noOfAWBs,
    });
    const result = await transactionHdrController.update(language, transactionHdr);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivateByID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHdrController.deactivateByID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activateByID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHdrController.activateByID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivateBySubAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHdrController.deactivateBySubAccountID(Number(req.params.SubAccountID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activateBySubAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHdrController.activateBySubAccountID(Number(req.params.SubAccountID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivateByMainAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHdrController.deactivateByMainAccountID(Number(req.params.MainAccountID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activateByMainAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHdrController.activateByMainAccountID(Number(req.params.MainAccountID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const transactionHdrRouter = (app: express.Application) => {
  app.get('/transactionHdr/:isActive/:limit?', getAll);
  app.get('/transactionHdr-by-ID/:ID', getById);
  app.get('/transactionHdr-by-subAccountID/:subAccountID/:limit?', getBySubAccountId);
  app.get('/transactionHdr-by-mainAccountID/:mainAccountID/:limit?', getByMainAccountId);
  app.post('/transactionHdr', create);
  app.put('/transactionHdr/:ID', update);
  app.put('/transactionHdr/de-activate-by-ID/:ID', deactivateByID);
  app.put('/transactionHdr/activate-by-ID/:ID', activateByID);
  app.put('/transactionHdr/de-activate-by-subAccountID/:SubAccountID', deactivateBySubAccountID);
  app.put('/transactionHdr/activate-by-subAccountID/:SubAccountID', activateBySubAccountID);
  app.put('/transactionHdr/de-activate-by-mainAccountID/:MainAccountID', deactivateByMainAccountID);
  app.put('/transactionHdr/activate-by-mainAccountID/:MainAccountID', activateByMainAccountID);
};

export default transactionHdrRouter;
