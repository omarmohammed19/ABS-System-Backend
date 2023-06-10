import express, { Request, Response } from 'express';
import { ResetPasswordController } from './Controller';

const resetPasswordController = new ResetPasswordController();

const getUserDetails = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userCred = req.body.userCred;
    const result = await resetPasswordController.getUserDetails(userCred);
    res.json(result);
  } catch (error) {
    console.log(error);
    
    res.status(400);
    res.json(error);
  }
};

const confirmResetPassword = async (req: Request, res: Response) => {
  try {
    const userID = req.body.userID;
    const password = req.body.password;
    const result = await resetPasswordController.confirmResetPassword(userID, password);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

const ResetPasswordRouter = (app: express.Application) => {
  app.post('/reset-password', getUserDetails);
  app.post('/confirm-reset-password', confirmResetPassword);
};
export default ResetPasswordRouter;
