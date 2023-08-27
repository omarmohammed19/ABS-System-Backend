import express, { Request, Response } from 'express';
import { VerifyEmailController } from './Controller';

const verifyEmailController = new VerifyEmailController();

const verifyVerificationTypeID = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.body.subAccountID;
    const result = await verifyEmailController.verifyVerificationTypeID(subAccountID);
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
}

const sendEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const result = await verifyEmailController.sendEmail(email);
    res.json(result);
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
}

const verifyEmailRouter = (app: express.Application) => {
  app.post('/subAccounts-verification/send-email', sendEmail);
  app.post('/subAccounts-verification/verify-email', verifyVerificationTypeID);
};

export default verifyEmailRouter;
