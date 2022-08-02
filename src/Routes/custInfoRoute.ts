import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { custInfoController } from '../Controllers/custInfoController';

dotenv.config();

const makeCustInfoRoute = new custInfoController();

const getcustInfo = async (_req: Request, res: Response) => {
    try {
        const result = await makeCustInfoRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getcustInfoById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeCustInfoRoute.get(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);

    }
}

const addcustInfo = async (req: Request, res: Response) => {
    try {
        const result = await makeCustInfoRoute.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updatecustInfo = async (req: Request, res: Response) => {
    try {
        const result = await makeCustInfoRoute.update(
            {
                ID: parseInt(req.params.id),
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        );
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }

}

const deletecustInfo = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeCustInfoRoute.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const custInfo_router = (app: express.Application) => {
    app.get('/custInfo', getcustInfo);
    app.get('/custInfo/:id', getcustInfoById);
    app.post('/custInfo', addcustInfo);
    app.put('/custInfo/:id', updatecustInfo);
    app.delete('/custInfo/:id', deletecustInfo);
}

export default custInfo_router;