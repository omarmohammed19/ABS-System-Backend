import express, { Request, Response } from 'express';
import { PaymentMethodsController } from './Controller';
import { PaymentMethodsModel } from './Model';

const paymentMethodsController = new PaymentMethodsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await paymentMethodsController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await paymentMethodsController.getPaymentMethodsById(Number(req.params.ID), language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const bankDetails = <PaymentMethodsModel>{
      enPaymentMethodType: req.body.enPaymentMethodType,
      arPaymentMethodType: req.body.arPaymentMethodType,
      Notes: req.body.Notes
    };
    const result = await paymentMethodsController.create(bankDetails);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const bankDetails = <PaymentMethodsModel>{
      ID: Number(req.params.ID),
      enPaymentMethodType: req.body.enPaymentMethodType,
      arPaymentMethodType: req.body.arPaymentMethodType,
      Notes: req.body.Notes
    };
    const result = await paymentMethodsController.update(bankDetails);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await paymentMethodsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await paymentMethodsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const paymentMethodsRouter = (app: express.Application) => {
  app.get('/paymentMethods', getAll);
  app.get('/paymentMethods/:ID', getById);
  app.post('/paymentMethods', create);
  app.put('/paymentMethods/:ID', update);
  app.put('/paymentMethods/deactivate/:ID', deactivate);
  app.put('/paymentMethods/activate/:ID', activate);
};

export default paymentMethodsRouter;
