import express, { Request, Response } from 'express';
import { TransactionsDelController } from './Controller';
import { TransactionsDelModel } from './Model';
import Sequalize from 'sequelize';

const transactionsDelController = new TransactionsDelController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsDelController.index(language, Number(req.params.isActive), Number(req.params.limit));
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
    const result = await transactionsDelController.getTransactionsByTransHdrID(Number(req.params.transHdrID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBymainAccountID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsDelController.getTransactionsBymainAccountID(Number(req.params.mainAccountID), language, Number(req.params.limit));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBysubAccountID = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await transactionsDelController.getTransactionsBysubAccountID(Number(req.params.subAccountID), language, Number(req.params.limit));
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
    const result = await transactionsDelController.getTransactionsByAWB(String(req.params.AWB), language);
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
    const transactions = <TransactionsDelModel>(<unknown>{
      transHdrID: req.body.transHdrID,
      AWB: req.body.AWB,
      Ref: req.body.Ref,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      serviceID: req.body.serviceID,
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

    const result = await transactionsDelController.create(transactions);
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
    const transactions = <TransactionsDelModel>(<unknown>{
      AWB: req.params.AWB,
      transHdrID: req.body.transHdrID,
      Ref: req.body.Ref,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      serviceID: req.body.serviceID,
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
      paymentDate: currentDate,
    });
    const result = await transactionsDelController.updateByAWB(language, transactions);
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
    const transactions = <TransactionsDelModel>(<unknown>{
      transHdrID: req.params.transHdrID,
      AWB: req.body.AWB,
      Ref: req.body.Ref,
      mainAccountID: req.body.mainAccountID,
      subAccountID: req.body.subAccountID,
      serviceID: req.body.serviceID,
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
      paymentDate: currentDate,
    });
    const result = await transactionsDelController.updateByTransHdrID(language, transactions);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivateByAWB = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.deactivateByAWB(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivateByTransHdrID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.deactivateByTransHdrID(Number(req.params.transHdrID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivateByMainAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.deactivateByMainAccountID(Number(req.params.mainAccountID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const deactivateBySubAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.deactivateBySubAccountID(Number(req.params.subAccountID));
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const activateByAWB = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.activateByAWB(String(req.params.AWB));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activateByTransHdrID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.activateByTransHdrID(Number(req.params.transHdrID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activateByMainAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.activateByMainAccountID(Number(req.params.mainAccountID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activateBySubAccountID = async (req: Request, res: Response) => {
  try {
    const result = await transactionsDelController.activateBySubAccountID(Number(req.params.subAccountID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const transactionsRouter = (app: express.Application) => {
  app.get('/transactionsDel/:isActive/:limit?', getAll);
  app.get('/transactionsDel-by-transHdrID/:transHdrID', getByTransHdrID);
  app.get('/transactionsDel-by-AWB/:AWB', getByAWB);
  app.get('/transactionsDel-by-mainAccountID/:mainAccountID/:limit?', getBymainAccountID);
  app.get('/transactionsDel-by-subAccountID/:subAccountID/:limit?', getBysubAccountID);
  app.post('/transactionsDel', create);
  app.put('/transactionsDel-by-transHdrID/:transHdrID', updateByTransHdrID);
  app.put('/transactionsDel-by-AWB/:AWB', updateByAWB);
  app.put('/transactionsDel/de-activate-by-transHdrID/:transHdrID', deactivateByTransHdrID);
  app.put('/transactionsDel/de-activate-by-AWB/:AWB', deactivateByAWB);
  app.put('/transactionsDel/de-activate-by-mainAccountID/:mainAccountID', deactivateByMainAccountID);
  app.put('/transactionsDel/de-activate-by-subAccountID/:subAccountID', deactivateBySubAccountID);
  app.put('/transactionsDel/activate-by-transHdrID/:transHdrID', activateByTransHdrID);
  app.put('/transactionsDel/activate-by-AWB/:AWB', activateByAWB);
  app.put('/transactionsDel/activate-by-mainAccountID/:mainAccountID', activateByMainAccountID);
  app.put('/transactionsDel/activate-by-subAccountID/:subAccountID', activateBySubAccountID);
};

export default transactionsRouter;
