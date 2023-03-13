import express, { Request, Response } from 'express';
import { CallStatusController } from './Controller';
import { CallStatusModel } from './Model';

const callStatusController = new CallStatusController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callStatusController.index(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callStatusController.getCallStatusByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const callStatus = <CallStatusModel>{
            enCallStatus: req.body.enCallStatus,
            arCallStatus: req.body.arCallStatus,
            Notes: req.body.Notes,
        };
        const result = await callStatusController.create(callStatus);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const callStatus = <CallStatusModel>{
            ID: Number(req.params.ID),
            enCallStatus: req.body.enCallStatus,
            arCallStatus: req.body.arCallStatus,
            Notes: req.body.Notes,
        };
        const result = await callStatusController.update(callStatus);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await callStatusController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await callStatusController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const callStatusRouter = (app: express.Application) => {
    app.get('/call-status', getAll);
    app.get('/call-status/:ID', getById);
    app.post('/call-status', create);
    app.put('/call-status/:ID', update);
    app.put('/call-status/deactivate/:ID', deactivate);
    app.put('/call-status/activate/:ID', activate);
};

export default callStatusRouter;
