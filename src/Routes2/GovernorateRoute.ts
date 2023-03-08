import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { governoratesController } from '../Controllers2/GovernorateController';

dotenv.config();

const makeGovernorateRoute = new governoratesController();

const getGovernorates = async (_req: Request, res: Response) => {
    try {
        const result = await makeGovernorateRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getGovernorateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeGovernorateRoute.get(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addGovernorate = async (req: Request, res: Response) => {
    try {
        const result = await makeGovernorateRoute.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateGovernorate = async (req: Request, res: Response) => {
    try {
        const result = await makeGovernorateRoute.update(
            {
                ID: parseInt(req.params.id),
                governorateName: req.body.governorateName,
                countryID: req.body.countryID
            }
        );
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteGovernorate = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeGovernorateRoute.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const governorates_Route = (app: express.Application) => {
    app.get('/governorates', getGovernorates);
    app.get('/governorates/:id', getGovernorateById);
    app.post('/governorates', addGovernorate);
    app.put('/governorates/:id', updateGovernorate);
    app.delete('/governorates/:id', deleteGovernorate);
}

export default governorates_Route;