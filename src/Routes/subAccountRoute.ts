import express, { Request, Response } from 'express';
import { subAccountController } from '../Controllers/subAccountController';

const subAccountRouter = express.Router();
const sub = new subAccountController();

async function getSubAccountByID(req: Request, res: Response) {
  try {
    const subAccount = await sub.getSubAccountByID(Number(req.params.id));
    res.status(200).json(subAccount);
  } catch (error) {
    res.status(500).json('Could not get the sub-account');
  }
}
async function addSubAccount(req: Request, res: Response) {
  try {
    const subAccount = await sub.addSubAccount(req.body);
    res.status(200).json(subAccount);
  } catch (error) {
    res.status(500).json('Could not add a new sub-account');
  }
}
async function getSubAccount(req: Request, res: Response) {
  try {
    const subAccount = await sub.getSubAccount();
    res.status(200).json(subAccount);
  } catch (error) {
    res.status(500).json('Could not get sub-account');
  }
}
async function deleteSubAccount(req: Request, res: Response) {
  try {
    const subAccount = await sub.deleteSubAccount(Number(req.params.id));
    res.status(200).json(subAccount);
  } catch (error) {
    res.status(500).json('Could not delete the sub-account');
  }
}
async function updateSubAccount(req: Request, res: Response) {
  try {
    const subAccount = await sub.updateSubAccount({
      ID: Number(req.params.id),
      mainAccountNumber: req.body.mainAccountNumber,
      subAccountName: req.body.subAccountName,
      accountNumber: req.body.accountNumber,
      pricePlanID: req.body.pricePlanID,
      paymentMethodID: req.body.paymentMethodID,
      productTypeID: req.body.productTypeID,
    });
    res.status(200).json(subAccount);
  } catch (error) {
    res.status(404).json('The sub-account is not found');
  }
}
const subAccount_endpoints = (app: express.Application) => {
  app.get('/subaccount/get/:id', getSubAccountByID);
  app.get('/subaccount/get', getSubAccount);
  app.post('/subaccount/add', addSubAccount);
  app.delete('/subaccount/delete/:id', deleteSubAccount);
  app.put('/subaccount/update/:id', updateSubAccount);
};
export default subAccount_endpoints;
