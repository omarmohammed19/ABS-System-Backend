import express, { Request, Response } from 'express';
import { TransactionsController } from './Controller';
import { TransactionsModel } from './Model';
import Sequalize from 'sequelize';

const transactionsController = new TransactionsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsController.index(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const getByTransHdrID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsController.getTransactionsByTransHdrID(Number(req.params.transHdrID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBymainAccountID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsController.getTransactionsBymainAccountID(Number(req.params.mainAccountID), language, Number(req.params.limit));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBysubAccountID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsController.getTransactionsBysubAccountID(Number(req.params.subAccountID), language, Number(req.params.limit));
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(400);
    res.json(error);
  }
};

const getByAWB = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsController.getTransactionsByAWB(String(req.params.AWB), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const expectedDeliveryDate = Sequalize.literal('GETDATE()+1');
    const expiryDate = Sequalize.literal('GETDATE()+3');
    const transactions = <TransactionsModel>(<unknown>{
      transHdrID: req.body.transHdrID,
      AWB: req.body.AWB,
      Ref: req.body.Ref,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      shipmentTypeID: req.body.shipmentTypeID,
      statusID: req.body.statusID,
      expectedDeliveryDate: expectedDeliveryDate,
      productID: req.body.productID,
      creationDate: currentDate,
      runnerID: req.body.runnerID,
      lastChangeDate: currentDate,
      userID: req.body.userID,
      expiryDate: expiryDate,
      deliveryBranchID: req.body.deliveryBranchID,
      fromBranchID: req.body.fromBranchID,
      toBranchID: req.body.toBranchID,
      currentBranchID: req.body.currentBranchID,
      specialInstructions: req.body.specialInstructions,
      IDNO: req.body.IDNO,
      recipientID: req.body.recipientID,
      recipientName: req.body.recipientName,
      packageTypeID: req.body.packageTypeID,
      noOfPcs: req.body.noOfPcs,
      contents: req.body.contents,
      weight: req.body.weight,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      actualWeight: req.body.actualWeight,
      Cash: req.body.Cash,
    });

    const result = await transactionsController.create(transactions);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const updateByAWB = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const transactions = <TransactionsModel>(<unknown>{
      AWB: req.params.AWB,
      transHdrID: req.body.transHdrID,
      Ref: req.body.Ref,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      shipmentTypeID: req.body.shipmentTypeID,
      statusID: req.body.statusID,
      productID: req.body.productID,
      creationDate: currentDate,
      runnerID: req.body.runnerID,
      lastChangeDate: currentDate,
      userID: req.body.userID,
      deliveryBranchID: req.body.deliveryBranchID,
      fromBranchID: req.body.fromBranchID,
      toBranchID: req.body.toBranchID,
      currentBranchID: req.body.currentBranchID,
      specialInstructions: req.body.specialInstructions,
      IDNO: req.body.IDNO,
      recipientID: req.body.recipientID,
      recipientName: req.body.recipientName,
      packageTypeID: req.body.packageTypeID,
      noOfPcs: req.body.noOfPcs,
      contents: req.body.contents,
      weight: req.body.weight,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      actualWeight: req.body.actualWeight,
      Cash: req.body.Cash,
      collectedFromRunner: req.body.collectedFromRunner,
      collectedFromBranch: req.body.collectedFromBranch,
      isPaid: req.body.isPaid,
    });
    const result = await transactionsController.updateByAWB(language, transactions);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const updateByTransHdrID = async (req: Request, res: Response) => {
  try {
    const currentDate = Sequalize.literal('GETDATE()');
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const transactions = <TransactionsModel>(<unknown>{
      transHdrID: req.params.transHdrID,
      AWB: req.body.AWB,
      Ref: req.body.Ref,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      shipmentTypeID: req.body.shipmentTypeID,
      statusID: req.body.statusID,
      productID: req.body.productID,
      creationDate: currentDate,
      runnerID: req.body.runnerID,
      lastChangeDate: currentDate,
      userID: req.body.userID,
      deliveryBranchID: req.body.deliveryBranchID,
      fromBranchID: req.body.fromBranchID,
      toBranchID: req.body.toBranchID,
      currentBranchID: req.body.currentBranchID,
      specialInstructions: req.body.specialInstructions,
      IDNO: req.body.IDNO,
      recipientID: req.body.recipientID,
      recipientName: req.body.recipientName,
      packageTypeID: req.body.packageTypeID,
      noOfPcs: req.body.noOfPcs,
      contents: req.body.contents,
      weight: req.body.weight,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      actualWeight: req.body.actualWeight,
      Cash: req.body.Cash,
      collectedFromRunner: req.body.collectedFromRunner,
      collectedFromBranch: req.body.collectedFromBranch,
      isPaid: req.body.isPaid,
    });
    const result = await transactionsController.updateByTransHdrID(language, transactions);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivateByAWB = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.deactivateByAWB(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivateByTransHdrID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.deactivateByTransHdrID(Number(req.params.transHdrID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivateByMainAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.deactivateByMainAccountID(Number(req.params.mainAccountID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivateBySubAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.deactivateBySubAccountID(Number(req.params.subAccountID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activateByAWB = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.activateByAWB(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activateByTransHdrID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.activateByTransHdrID(Number(req.params.transHdrID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activateByMainAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.activateByMainAccountID(Number(req.params.mainAccountID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activateBySubAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsController.activateBySubAccountID(Number(req.params.subAccountID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const transactionsRouter = (app: express.Application) => {
  app.get('/transactions/:isActive/:limit?', getAll);
  app.get('/transactions-by-transHdrID/:transHdrID', getByTransHdrID);
  app.get('/transactions-by-AWB/:AWB', getByAWB);
  app.get('/transactions-by-mainAccountID/:mainAccountID/:limit?', getBymainAccountID);
  app.get('/transactions-by-subAccountID/:subAccountID/:limit?', getBysubAccountID);
  app.post('/transactions', create);
  app.put('/transactions-by-transHdrID/:transHdrID', updateByTransHdrID);
  app.put('/transactions-by-AWB/:AWB', updateByAWB);
  app.put('/transactions/de-activate-by-transHdrID/:transHdrID', deactivateByTransHdrID);
  app.put('/transactions/de-activate-by-AWB/:AWB', deactivateByAWB);
  app.put('/transactions/de-activate-by-mainAccountID/:mainAccountID', deactivateByMainAccountID);
  app.put('/transactions/de-activate-by-subAccountID/:subAccountID', deactivateBySubAccountID);
  app.put('/transactions/activate-by-transHdrID/:transHdrID', activateByTransHdrID);
  app.put('/transactions/activate-by-AWB/:AWB', activateByAWB);
  app.put('/transactions/activate-by-mainAccountID/:mainAccountID', activateByMainAccountID);
  app.put('/transactions/activate-by-subAccountID/:subAccountID', activateBySubAccountID);
};

export default transactionsRouter;
