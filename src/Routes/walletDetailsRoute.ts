import express, { Request, Response } from 'express';
import { walletDetailsController } from '../Controllers/walletDetailsController';

const walletDetailsRouter = express.Router();
const wallet = new walletDetailsController();

async function getWalletDetailsByID(req: Request, res: Response) {
  try {
    const walletDetails = await wallet.getWalletDetailsByID(Number(req.params.id));
    res.status(200).json(walletDetails);
  } catch (error) {
    res.status(500).json('Could not get the wallet details');
  }
}

async function addWalletDetail(req: Request, res: Response) {
  try {
    const walletDetails = await wallet.addWalletDetail(req.body);
    res.status(200).json(walletDetails);
  } catch (error) {
    res.status(500).json('Could not add a new wallet detail');
  }
}

async function getWalletDetails(req: Request, res: Response) {
  try {
    const walletDetails = await wallet.getWalletDetails();
    res.status(200).json(walletDetails);
  } catch (error) {
    res.status(500).json('Could not get the wallet details');
  }
}

async function deleteWalletDetails(req: Request, res: Response) {
  try {
    const walletDetails = await wallet.deleteWalletDetails(Number(req.params.id));
    res.status(200).json(walletDetails);
  } catch (error) {
    res.status(500).json('Could not delete the wallet details');
  }
}

async function updateWalletDetails(req: Request, res: Response) {
  try {
    const walletDetails = await wallet.updateWalletDetails({
      ID: Number(req.params.id),
      walletNumber: req.body.walletNumber,
      mobileNumber: req.body.mobileNumber,
    });
    res.status(200).json(walletDetails);
  } catch (error) {
    res.status(404).json('The wallet details is not found');
  }
}

const walletDetails_endpoints = (app: express.Application) => {
  app.get('/walletDetails/get/:id', getWalletDetailsByID);
  app.get('/walletDetails/get', getWalletDetails);
  app.post('/walletDetails/add', addWalletDetail);
  app.delete('/walletDetails/delete/:id', deleteWalletDetails);
  app.put('/walletDetails/update/:id', updateWalletDetails);
};

export default walletDetails_endpoints;
