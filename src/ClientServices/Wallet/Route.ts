import express, { Request, Response } from 'express';
import { WalletController } from './Controller';
import { log } from 'console';

const walletController = new WalletController();

const getABSFees = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const subAccountID = req.subAccountID;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const result = await walletController.getABSFees(subAccountID, fromDate, toDate);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
}

const getPaidCash = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const subAccountID = req.subAccountID;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const result = await walletController.getCash('paidCash', subAccountID, fromDate, toDate);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const getExpectedCash = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const subAccountID = req.subAccountID;
        const result = await walletController.getCash('expectedCash', subAccountID);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
}

const getShipments = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const subAccountID = req.subAccountID;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const limit = Number(req.params.limit);
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await walletController.getShipments(limit, language, subAccountID, fromDate, toDate);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const walletServicesRouter = (app: express.Application) => {
    app.post('/wallet-ABS-Fees', getABSFees);
    app.post('/wallet-paid-cash', getPaidCash);
    app.post('/wallet-expected-cash', getExpectedCash);
    app.post('/wallet-shipments/:limit/', getShipments);
}
export default walletServicesRouter;