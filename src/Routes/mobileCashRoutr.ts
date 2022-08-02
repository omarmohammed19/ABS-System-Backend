import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { mobileCashController } from '../Controllers/mobileCashControler';

dotenv.config();

const makeMobileCashRoute = new mobileCashController();

const getMobileCashs = async (_req: Request, res: Response) => {
    try {
        const result = await makeMobileCashRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getMobileCashById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeMobileCashRoute.get(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const addMobileCash = async (req: Request, res: Response) => {
    try {
        const result = await makeMobileCashRoute.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateMobileCash = async (req: Request, res: Response) => {
    try {
        const result = await makeMobileCashRoute.update(
            {
                ID: parseInt(req.params.id),
                mobileNumber: req.body.mobileNumber
            }
        );
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const deleteMobileCash = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeMobileCashRoute.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const mobileCash_Route = (app: express.Application) => {
    app.get('/mobileCashs', getMobileCashs);
    app.get('/mobileCash/:id', getMobileCashById);
    app.post('/mobileCash', addMobileCash);
    app.put('/mobileCash/:id', updateMobileCash);
    app.delete('/mobileCash/:id', deleteMobileCash);
}

export default mobileCash_Route;
