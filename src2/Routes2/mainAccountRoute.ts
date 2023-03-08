import { mainAccountController } from './../Controllers2/mainAccountController';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const makeMainAccountRoute = new mainAccountController();

const getMainAccounts = async (_req: Request, res: Response) => {
    try {
        const result = await makeMainAccountRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getMainAccountById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeMainAccountRoute.get(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addMainAccount = async (req: Request, res: Response) => {
    try {
        const result = await makeMainAccountRoute.add(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateMainAccount = async (req: Request, res: Response) => {
    try {
        const result = await makeMainAccountRoute.update(
            {
                ID: parseInt(req.params.id),
                mainAccountName: req.body.mainAccountName,
                salesManID: req.body.salesManID,
                custInfoID: req.body.custInfoID,
                companyInfoID: req.body.companyInfoID,
                registrationDate: req.body.registrationDate,
            }
        );
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const deleteMainAccount = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeMainAccountRoute.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const mainAccount_Route = (app: express.Application) => {
    app.get('/mainAccounts', getMainAccounts);
    app.get('/mainAccount/:id', getMainAccountById);
    app.post('/mainAccount', addMainAccount);
    app.put('/mainAccount/:id', updateMainAccount);
    app.delete('/mainAccount/:id', deleteMainAccount);
}

export default mainAccount_Route;
