import express, { Request, Response } from 'express';
import { PaymentInfoController } from './Controller';
import { PaymentInfoModel } from './Model';
import Sequalize from 'sequelize';

const paymentInfoController = new PaymentInfoController();

const currentDate = Sequalize.literal('GETDATE()');

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await paymentInfoController.index(language, Number(req.params.isActive), Number(req.params.limit), Number(req.params.paymentMethodID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await paymentInfoController.getPaymentInfoBySubAccountID(subAccountID, language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const MainAccount = <PaymentInfoModel>({
      subAccountID: req.body.subAccountID,
      mobileCashID: req.body.mobileCashID,
      walletDetailsID: req.body.walletDetailsID,
      nearestBranchID: req.body.nearestBranchID,
      bankDetailsID: req.body.bankDetailsID
    });
    const result = await paymentInfoController.create(MainAccount);
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
    const MainAccount = <PaymentInfoModel>{
      ID: Number(req.params.ID),
      subAccountID: req.body.subAccountID,
      mobileCashID: req.body.mobileCashID,
      walletDetailsID: req.body.walletDetailsID,
      nearestBranchID: req.body.nearestBranchID,
      bankDetailsID: req.body.bankDetailsID
    };
    const result = await paymentInfoController.update(MainAccount, language);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await paymentInfoController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await paymentInfoController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const paymentInfoRouter = (app: express.Application) => {
  app.get('/payment-info/:isActive/:paymentMethodID/:limit', getAll);
  app.get('/payment-info-by-sub-account-ID', getById);
  app.post('/payment-info', create);
  app.put('/payment-info/:ID', update);
  app.put('/payment-info/de-activate/:ID', deactivate);
  app.put('/payment-info/activate/:ID', activate);
};

export default paymentInfoRouter;
