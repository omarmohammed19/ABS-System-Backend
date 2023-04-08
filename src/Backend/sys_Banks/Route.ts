import express, { Request, Response } from 'express';
import { BanksController } from './Controller';
import { BanksModel } from './Model';

const banksController = new BanksController();

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await banksController.index(Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const result = await banksController.getBankNameByID(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const bankName = <BanksModel>{
            enBankName: req.body.enBankName,
            arBankName: req.body.arBankName,
            Notes: req.body.Notes,
        };
        const result = await banksController.create(bankName);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const bankName = <BanksModel>{
            ID: Number(req.params.ID),
            enBankName: req.body.enBankName,
            arBankName: req.body.arBankName,
            Notes: req.body.Notes,
        };
        const result = await banksController.update(bankName);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await banksController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await banksController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const BanksRouter = (app: express.Application) => {
    app.get('/banks/:isActive', getAll);
    app.get('/banks-by-id/:ID', getById);
    app.post('/banks', create);
    app.put('/banks/:ID', update);
    app.put('/banks/deactivate/:ID', deactivate);
    app.put('/banks/activate/:ID', activate);
};

export default BanksRouter;
