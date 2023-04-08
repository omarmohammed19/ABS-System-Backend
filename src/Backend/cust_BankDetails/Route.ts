import express, { Request, Response } from 'express';
import { BankDetailsController } from './Controller';
import { BankDetailsModel } from './Model';

const bankDetailsController = new BankDetailsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await bankDetailsController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await bankDetailsController.getBankDetialsById(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        console.log(error);

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
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const bankDetails = <BankDetailsModel>{
            ID: Number(req.params.ID),
            accountHolderName: req.body.accountHolderName,
            accountNumber: req.body.accountNumber,
            bankNameID: req.body.bankNameID,
            IBAN: req.body.IBAN,
            swiftCode: req.body.swiftCode
        };
        const result = await bankDetailsController.update(bankDetails, language);
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
    app.get('/bank-details/:isActive', getAll);
    app.get('/bank-details-by-ID/:ID', getById);
    app.post('/bank-details', create);
    app.put('/bank-details/:ID', update);
    app.put('/bank-details/de-activate/:ID', deactivate);
    app.put('/bank-details/activate/:ID', activate);
};

export default bankDetailsRouter;
