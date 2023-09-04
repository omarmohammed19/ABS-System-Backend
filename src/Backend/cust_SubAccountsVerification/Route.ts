import express, { Request, Response } from 'express';
import { SubAccountsVerificationController } from './Controller';
import { SubAccountsVerificationModel } from './Model';

const subAccountsVerificationController = new SubAccountsVerificationController();

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await subAccountsVerificationController.index();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await subAccountsVerificationController.getSubAccountsVerificationById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getBySubAccountId = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await subAccountsVerificationController.getSubAccountsVerificationBySubAccountId(subAccountID, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const subAccountsVerification = <SubAccountsVerificationModel>{
      subAccountID: req.body.subAccountID,
      verificationTypeID: req.body.verificationTypeID,
    };
    const result = await subAccountsVerificationController.create(subAccountsVerification);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const verificationType = <SubAccountsVerificationModel>{
      ID: Number(req.params.ID),
      subAccountID: req.body.subAccountID,
      verificationTypeID: req.body.verificationTypeID,
      isVerified: req.body.isVerified,
    };
    const result = await subAccountsVerificationController.update(verificationType, language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const verifyVerificationTypeID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const verificationTypeID = req.params.verificationTypeID;
    const result = await subAccountsVerificationController.verifyVerificationTypeID(subAccountID, Number(verificationTypeID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
}

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await subAccountsVerificationController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await subAccountsVerificationController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const subAccountVerificationRouter = (app: express.Application) => {
  app.get('/subAccounts-verification', getAll);
  app.get('/subAccounts-verification-by-id/:ID', getById);
  app.get('/subAccounts-verification-by-subAccountId', getBySubAccountId);
  app.post('/subAccounts-verification', create);
  app.put('/subAccounts-verification/:ID', update);
  app.put('/subAccounts-verification/verify/:verificationTypeID', verifyVerificationTypeID);
  app.put('/subAccounts-verification/de-activate/:ID', deactivate);
  app.put('/subAccounts-verification/activate/:ID', activate);
};

export default subAccountVerificationRouter;
