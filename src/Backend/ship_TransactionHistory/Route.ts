import express, { Request, Response } from 'express';
import { TransactionHistoryController } from './Controller';
import { TransactionHistoryModel } from './Model';
import Sequalize from 'sequelize';

const transactionHistoryController = new TransactionHistoryController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionHistoryController.index(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getByAWB = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionHistoryController.getTransactionHistoryByAWB(String(req.params.AWB), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const transactionHistory = <TransactionHistoryModel>(<unknown>{
      transID: req.body.transID,
      shipmentTypeID: req.body.shipmentTypeID,
      statusID: req.body.statusID,
      runnerID: req.body.runnerID,
      auditDate: currentDate,
      reasonID: req.body.reasonID,
      userID: req.body.userID,
      fromBranchID: req.body.fromBranchID,
      toBranchID: req.body.toBranchID,
      currentBranchID: req.body.currentBranchID,
    });

    const result = await transactionHistoryController.create(transactionHistory);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const updateByID = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const transactionHistory = <TransactionHistoryModel>(<unknown>{
      ID: req.params.ID,
      shipmentTypeID: req.body.shipmentTypeID,
      statusID: req.body.statusID,
      runnerID: req.body.runnerID,
      auditDate: currentDate,
      reasonID: req.body.reasonID,
      userID: req.body.userID,
      fromBranchID: req.body.fromBranchID,
      toBranchID: req.body.toBranchID,
      currentBranchID: req.body.currentBranchID,
    });
    const result = await transactionHistoryController.updateByID(language, transactionHistory);
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(400);
    res.json(error);
  }
};

const updateByAWB = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const transactionHistory = <TransactionHistoryModel>(<unknown>{
      shipmentTypeID: req.body.shipmentTypeID,
      statusID: req.body.statusID,
      runnerID: req.body.runnerID,
      auditDate: currentDate,
      reasonID: req.body.reasonID,
      userID: req.body.userID,
      fromBranchID: req.body.fromBranchID,
      toBranchID: req.body.toBranchID,
      currentBranchID: req.body.currentBranchID,
    });
    const result = await transactionHistoryController.updateByAWB(req.params.AWB, language, transactionHistory);
    res.json(result);
  } catch (error) {
    console.log(req.params.AWB)
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivateByID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHistoryController.deactivateByID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activateByID = async (req: Request, res: Response) => {
  try {
    const result = await transactionHistoryController.activateByID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivateByAWB = async (req: Request, res: Response) => {
  try {
    const result = await transactionHistoryController.deactivateByAWB(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activateByAWB = async (req: Request, res: Response) => {
  try {
    const result = await transactionHistoryController.activateByAWB(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const transactionHistoryRouter = (app: express.Application) => {
  app.get('/transactionHistory/:isActive/:limit?', getAll);
  app.get('/transactionHistory-by-AWB/:AWB', getByAWB);
  app.post('/transactionHistory', create);
  app.put('/transactionHistory-by-AWB/:AWB', updateByAWB);
  app.put('/transactionHistory-by-ID/:ID', updateByID);
  app.put('/transactionHistory/de-activate-by-AWB/:AWB', deactivateByAWB);
  app.put('/transactionHistory/activate-by-AWB/:AWB', activateByAWB);
  app.put('/transactionHistory/de-activate-by-ID/:ID', deactivateByID);
  app.put('/transactionHistory/activate-by-ID/:ID', activateByID);
};

export default transactionHistoryRouter;
