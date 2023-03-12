import express, { Request, Response } from 'express';
import { BankDetailsController } from './Controller';
import { BankDetailsModel } from './Model';

const bankDetailsController = new BankDetailsController();

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await bankDetailsController.index();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const result = await bankDetailsController.getBankDetialsById(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const bankDetails = <BankDetailsModel>{
        accountHolderName: req.body.accountHolderName,
        accountNumber: req.body.accountNumber,
        bankNameID: req.body.bankNameID,
        IBAN: req.body.IBAN,
        swiftCode: req.body.swiftCode
    };
    const result = await bankDetailsController.create(bankDetails);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const bankDetails = <BankDetailsModel>{
        ID: Number(req.params.ID),
        accountHolderName: req.body.accountHolderName,
        accountNumber: req.body.accountNumber,
        bankNameID: req.body.bankNameID,
        IBAN: req.body.IBAN,
        swiftCode: req.body.swiftCode
    };
    const result = await bankDetailsController.update(bankDetails);
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await bankDetailsController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await bankDetailsController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const bankDetailsRouter = (app: express.Application) => {
  app.get('/bankDetails', getAll);
  app.get('/bankDetails/:ID', getById);
  app.post('/bankDetails', create);
  app.put('/bankDetails/:ID', update);
  app.put('/bankDetails/deactivate/:ID', deactivate);
  app.put('/bankDetails/activate/:ID', activate);
};

export default bankDetailsRouter;
