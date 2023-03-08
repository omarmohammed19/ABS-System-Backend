import { legalPaperTypeController } from './../Controllers2/legalPaperTypeController';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const makeLegalPaperTypeRoute = new legalPaperTypeController();

const getLegalPaperTypes = async (_req: Request, res: Response) => {
    try {
        const result = await makeLegalPaperTypeRoute.index();
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getLegalPaperTypeById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeLegalPaperTypeRoute.get(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const addLegalPaperType = async (req: Request, res: Response) => {
    try {
        const result = await makeLegalPaperTypeRoute.add(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateLegalPaperType = async (req: Request, res: Response) => {
    try {
        const result = await makeLegalPaperTypeRoute.update(
            {
                ID: parseInt(req.params.id),
                legalPaperType: req.body.legalPaperType
            }
        );
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const deleteLegalPaperType = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeLegalPaperTypeRoute.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const legalPaperType_Route = (app: express.Application) => {
    app.get('/legalPaperTypes', getLegalPaperTypes);
    app.get('/legalPaperTypes/:id', getLegalPaperTypeById);
    app.post('/legalPaperTypes', addLegalPaperType);
    app.put('/legalPaperTypes/:id', updateLegalPaperType);
    app.delete('/legalPaperTypes/:id', deleteLegalPaperType);
}

export default legalPaperType_Route;