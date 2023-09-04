import express, { Request, Response } from 'express';
import { SubAccountsController } from './Controller';
import { SubAccountsModel } from './Model';
import Sequalize from 'sequelize';

const subAccountsController = new SubAccountsController();

const currentDate = Sequalize.literal('GETDATE()');

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await subAccountsController.index(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllSubAccounts = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await subAccountsController.getAllSubAccounts(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userID = req.userID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await subAccountsController.getSubAccountsById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getByMainAccountID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const mainAccountID = req.mainAccountID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await subAccountsController.getSubAccountsByMainAccountId(language, Number(req.params.isActive), mainAccountID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getPaymentMethodBySubAccountIDId = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const result = await subAccountsController.getPaymentMethodBySubAccountIDId(subAccountID);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const subAccount = <SubAccountsModel>(<unknown>{
      mainAccountID: req.body.mainAccountID,
      subAccountName: req.body.subAccountName,
      accountNumber: req.body.accountNumber,
      pricePlanID: req.body.pricePlanID,
      paymentMethodID: req.body.paymentMethodID,
      productTypeID: req.body.productTypeID,
      customerServiceID: req.body.customerServiceID,
      prefix: req.body.prefix,
      creationDate: currentDate,
    });
    const result = await subAccountsController.create(subAccount);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const subAccount = <SubAccountsModel>{
      ID: Number(req.params.ID),
      mainAccountID: req.body.mainAccountID,
      subAccountName: req.body.subAccountName,
      accountNumber: req.body.accountNumber,
      pricePlanID: req.body.pricePlanID,
      paymentMethodID: req.body.paymentMethodID,
      productTypeID: req.body.productTypeID,
      customerServiceID: req.body.customerServiceID,
      prefix: req.body.prefix,
      creationDate: req.body.creationDate,
    };
    const result = await subAccountsController.update(subAccount, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await subAccountsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await subAccountsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const subAccountsRouter = (app: express.Application) => {
  app.get('/sub-accounts/:isActive/:limit', getAll);
  app.get('/sub-accounts', getAllSubAccounts);
  app.get('/sub-accounts-by-ID', getById);
  app.get('/sub-accounts-by-main-account-ID/:isActive', getByMainAccountID);
  app.get('/sub-accounts-payment-method', getPaymentMethodBySubAccountIDId);
  app.post('/sub-accounts', create);
  app.put('/sub-accounts/:ID', update);
  app.put('/sub-accounts/de-activate/:ID', deactivate);
  app.put('/sub-accounts/activate/:ID', activate);
};

export default subAccountsRouter;
