import express, { Request, Response } from 'express'
import { PaymentMethod } from '../Models/paymentMethods'
import { PaymentMethodsController } from '../Controllers/paymentMethodsController'


const paymentMethodsRouter = express.Router();
const pm = new PaymentMethodsController();


async function getAllPaymentMethods(req: Request, res: Response) {
    try {
        const paymentMethods = await pm.index();
        res.status(200).json(paymentMethods);
    } catch (error) {
        res.status(400).json("Could not get paymentMethods");
    }
}


async function addPaymentMethod(req: Request, res: Response) {
    try {
        const paymentMethod = await pm.addPaymentMethod(req.body);
        console.log(paymentMethod);
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(400).json("Could not add paymentMethods");
    }
}


async function updatePaymentMethod(req: Request, res: Response) {
    try {
        const pmt: PaymentMethod = {
            ID: Number(req.params.id),
            paymentMethodType: req.body.paymentMethodType
        }
        const paymentMethod = await pm.updatePaymentMethod(pmt);
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(400).json("Could not update paymentMethods");
    }
}


async function deletePaymentMethod(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const paymentMethod = await pm.deletePaymentMethod(id);
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(400).json("Could not delete paymentMethods");
    }
}


async function getPaymentMethodByID(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const paymentMethod = await pm.getPaymentMethodByID(id);
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(400).json("Could not get paymentMethods");
    }
}


const paymentMethodsRoutes = (app: express.Application) => {
    app.get('/paymentMethods', getAllPaymentMethods);
    app.post('/paymentMethods', addPaymentMethod);
    app.put('/paymentMethods/:id', updatePaymentMethod);
    app.delete('/paymentMethods/:id', deletePaymentMethod);
    app.get('/paymentMethods/:id', getPaymentMethodByID);
}


export default paymentMethodsRoutes;