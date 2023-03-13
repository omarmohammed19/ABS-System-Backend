import express, { Request, Response } from 'express';
import { CallResultsController } from './Controller';
import { CallResultsModel } from './Model';

const callResultsController = new CallResultsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callResultsController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callResultsController.getCallResultByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const callResult = <CallResultsModel>{
            enCallResult: req.body.enCallResult,
            arCallResult: req.body.arCallResult,
            Notes: req.body.Notes,
        };
        const result = await callResultsController.create(callResult);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const callResult = <CallResultsModel>{
            ID: Number(req.params.ID),
            enCallResult: req.body.enCallResult,
            arCallResult: req.body.arCallResult,
            Notes: req.body.Notes,
        };
        const result = await callResultsController.update(callResult);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await callResultsController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await callResultsController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getAllDeactivated = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callResultsController.getAllDeactivated(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const callResultsRouter = (app: express.Application) => {
    app.get('/call-results/:isActive', getAll);
    app.get('/call-results/:ID', getById);
    app.post('/call-results', create);
    app.put('/call-results/:ID', update);
    app.put('/call-results/deactivate/:ID', deactivate);
    app.put('/call-results/activate/:ID', activate);
};

export default callResultsRouter;
