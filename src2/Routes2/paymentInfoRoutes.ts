import express, { Request, Response } from 'express'
import { PaymentInfo } from '../Models2/paymentInfo'
import { PaymentInfoController } from '../Controllers2/paymentInfoController'


const paymentInfoRouter = express.Router();
const pi = new PaymentInfoController();


async function getAllPaymentInfo(req: Request, res: Response) {
    try {
        const paymentInfo = await pi.index(req.body.paymentMethodID);
        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(400).json("Could not get paymentInfo");
    }
}


async function addPaymentInfo(req: Request, res: Response) {
    try {
        const paymentInfo = await pi.addPaymentInfo(req.body);
        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(400).json("Could not add paymentInfo");
    }
}


async function updatePaymentInfo(req: Request, res: Response) {
    try {
        const pii: PaymentInfo = {
            ID: Number(req.params.id),
            subAccountID: Number(req.body.subAccountID),
            mobileCashID: Number(req.body.mobileCashID),
            walletDetailsID: Number(req.body.walletDetailsID),
            nearestBranchID: Number(req.body.nearestBranchID),
            bankDetailID: Number(req.body.bankDetailID)
        }
        const paymentInfo = await pi.updatePaymentInfo(pii);
        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(400).json("Could not update paymentInfo");
        console.log(error);
    }
}


async function deletePaymentInfo(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const paymentInfo = await pi.deletePaymentInfo(id);
        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(400).json("Could not delete paymentInfo");
    }
}


async function getPaymentInfoByID(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);

        const paymentInfo = await pi.getPaymentInfoByID(id, req.body.paymentMethodID);
        res.status(200).json(paymentInfo);
    } catch (error) {
        res.status(400).json("Could not get paymentInfo");
    }
}


const paymentInfoRoutes = (app: express.Application) => {
    app.get('/paymentInfo/', getAllPaymentInfo);
    app.post('/paymentInfo/', addPaymentInfo);
    app.put('/paymentInfo/:id', updatePaymentInfo);
    app.delete('/paymentInfo/:id', deletePaymentInfo);
    app.get('/paymentInfo/:id', getPaymentInfoByID);
}


export default paymentInfoRoutes;