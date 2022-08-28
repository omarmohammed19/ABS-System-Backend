import { CustomersController } from '../Controllers/CustomersController';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const customersController = new CustomersController();

const getcustInfo = async (_req: Request, res: Response) => {
    try {
        const result = await customersController.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getCustInfoByAccNo = async (req: Request, res: Response) => {
    try {
        const accNo = parseInt(req.params.accNo);
        const result = await customersController.getCustomerByAccNo(accNo);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const customers_router = (app: express.Application) => {
    app.get('/customers', getcustInfo);
    app.get('/customers/:accNo', getCustInfoByAccNo);
}

export default customers_router;