import express, { Request, Response } from 'express';
import { MainAccountsController } from './Controller';
import { MainAccountsModel } from './Model';
import Sequalize from 'sequelize';

const mainAccountsController = new MainAccountsController();

const currentDate = Sequalize.literal('GETDATE()');

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await mainAccountsController.index(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await mainAccountsController.getMainAccountsById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getByUserId = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await mainAccountsController.getMainAccountsByUserId(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getSubAccounts = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await mainAccountsController.getSubAccountsByMainAccountId(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const MainAccount = <MainAccountsModel>(<unknown>{
      mainAccountName: req.body.mainAccountName,
      accountNumber: req.body.accountNumber,
      salesmanID: req.body.salesmanID,
      custInfoID: req.body.custInfoID,
      cmpInfoID: req.body.cmpInfoID,
      creationDate: currentDate,
    });
    const result = await mainAccountsController.create(MainAccount);
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
    const MainAccount = <MainAccountsModel>{
      ID: Number(req.params.ID),
      mainAccountName: req.body.mainAccountName,
      accountNumber: req.body.accountNumber,
      salesmanID: req.body.salesmanID,
      custInfoID: req.body.custInfoID,
      cmpInfoID: req.body.cmpInfoID,
      creationDate: req.body.creationDate,
    };
    const result = await mainAccountsController.update(MainAccount, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await mainAccountsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await mainAccountsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const mainAccountsRouter = (app: express.Application) => {
  app.get('/main-accounts/:isActive/:limit', getAll);
  app.get('/main-accounts-by-ID/:ID', getById);
  app.get('/main-accounts-by-user-ID/:ID', getByUserId);
  app.get('/sub-accounts-by-main-account-ID/:ID', getSubAccounts);
  app.post('/main-accounts', create);
  app.put('/main-accounts/:ID', update);
  app.put('/main-accounts/de-activate/:ID', deactivate);
  app.put('/main-accounts/activate/:ID', activate);
};

export default mainAccountsRouter;
