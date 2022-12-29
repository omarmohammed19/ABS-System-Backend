import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { BankDetails } from '../Models/bankDetailsModel';
import { bankDetailsController } from '../Controllers/bankDetailsController';

dotenv.config();

const bankdetailsController = new bankDetailsController();

const getAll = async (_req: Request, res: Response) => {
    try {
        const result = await bankdetailsController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getBankDetailsByID = async (req: Request, res: Response) => {
    try {
        const result = await bankdetailsController.getBankDetailsByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addBankDetails = async (req: Request, res: Response) => {
    try {
        const bankDetails: BankDetails = {
            accountHolderName: req.body.accountHolderName,
            accountNumber: req.body.accountNumber,
            bankNameID: Number(req.body.bankNameID),
            IBAN: req.body.IBAN,
            swiftCode: req.body.swiftCode,
        }
        const result = await bankdetailsController.create(bankDetails);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateBankDetails = async (req: Request, res: Response) => {
    try {
        const bankDetails: BankDetails = {
            bankDetailID: Number(req.params.id),
            accountHolderName: req.body.accountHolderName,
            accountNumber: req.body.accountNumber,
            bankNameID: req.body.bankNameID,
            IBAN: req.body.IBAN,
            swiftCode: req.body.swiftCode,
        }
        const result = await bankdetailsController.update(bankDetails);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteBankDetails = async (req: Request, res: Response) => {
    try {
        const result = await bankdetailsController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getBankDetailsBysubAccountID = async (req: Request, res: Response) => {
    try {
        const result = await bankdetailsController.getBankDetailsBysubAccountID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const bankDetailsRouter = (app: express.Application) => {
    app.post('/bankDetails', addBankDetails);
    app.get('/bankDetails/:id', getBankDetailsByID);
    app.get('/bankDetails', getAll);
    app.get('/bankDetails/subAccount/:id', getBankDetailsBysubAccountID);
    app.put('/bankDetails/:id', updateBankDetails);
    app.delete('/bankDetails/:id', deleteBankDetails);
}

export default bankDetailsRouter;