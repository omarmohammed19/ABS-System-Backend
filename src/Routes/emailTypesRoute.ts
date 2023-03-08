import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { emailTypesController } from '../Controllers2/emailTypesController';

dotenv.config();

const makeEmailTypesRoute = new emailTypesController();


const getEmailTypes = async (_req: Request, res: Response) => {
    try {
        const result = await makeEmailTypesRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEmailTypesById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeEmailTypesRoute.get(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addEmailTypes = async (req: Request, res: Response) => {
    try {
        const result = await makeEmailTypesRoute.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const updatedEmailTypes = async (req: Request, res: Response) => {
    try {
        const result = await makeEmailTypesRoute.update(
            {
                ID: parseInt(req.params.id),
                emailType: req.body.emailType,
            }
        );
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deletedEmailTypes = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeEmailTypesRoute.delete(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const emailTypesRoutes = (app: express.Application) => {
    app.get('/api/emailtypes', getEmailTypes);
    app.get('/api/emailtypes/:id', getEmailTypesById);
    app.post('/api/emailtypes', addEmailTypes);
    app.put('/api/emailtypes/:id', updatedEmailTypes);
    app.delete('/api/emailtypes/:id', deletedEmailTypes);
}
export default emailTypesRoutes;