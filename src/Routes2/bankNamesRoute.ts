import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { BankName } from '../Models2/bankNamesModel';
import { bankNamesController } from '../Controllers2/bankNamesController';

dotenv.config();

const banknamesController = new bankNamesController();

const getAll = async (_req: Request, res: Response) => {
    try {
        const result = await banknamesController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getBankNameByID = async (req: Request, res: Response) => {
    try {
        const result = await banknamesController.getBankNameByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addBankName = async (req: Request, res: Response) => {
    try {
        const bankName: BankName = {
            bankName: req.body.bankName
        }
        const result = await banknamesController.create(bankName);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateBankName = async (req: Request, res: Response) => {
    try {
        const bankName: BankName = {
            bankNameID: Number(req.params.id),
            bankName: req.body.bankName
        }
        const result = await banknamesController.update(bankName);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteBankName = async (req: Request, res: Response) => {
    try {
        const result = await banknamesController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const bankNamesRouter = (app: express.Application) => {
    app.post('/bankName', addBankName);
    app.get('/bankName/:id', getBankNameByID);
    app.get('/bankName', getAll);
    app.put('/bankName/:id', updateBankName);
    app.delete('/bankName/:id', deleteBankName);
}

export default bankNamesRouter;