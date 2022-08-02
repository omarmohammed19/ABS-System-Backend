import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { legalPapersController } from '../Controllers/legalPapersController';

dotenv.config();

const makeLegalPapersRoute = new legalPapersController();

const getLegalPapers = async (_req: Request, res: Response) => {
    try {
        const result = await makeLegalPapersRoute.index();
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const getLegalPapersById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeLegalPapersRoute.get(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const addLegalPapers = async (req: Request, res: Response) => {
    try {
        const result = await makeLegalPapersRoute.add(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateLegalPapers = async (req: Request, res: Response) => {
    try {
        const result = await makeLegalPapersRoute.update(
            {
                ID: parseInt(req.params.id),
                companyInfoID: req.body.companyInfoID,
                legalPaperTypeID: req.body.legalPaperTypeID,
                legalPaperImage: req.body.legalPaperImage
            }
        );
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const deleteLegalPapers = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeLegalPapersRoute.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const legalPapers_Route = (app: express.Application) => {
    app.get('/legalPapers', getLegalPapers);
    app.get('/legalPapers/:id', getLegalPapersById);
    app.post('/legalPapers', addLegalPapers);
    app.put('/legalPapers/:id', updateLegalPapers);
    app.delete('/legalPapers/:id', deleteLegalPapers);
}

export default legalPapers_Route;