import express, { Request, Response } from 'express';
import { CallTypesController } from './Controller';
import { CallTypesModel } from './Model';

const callTypesController = new CallTypesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callTypesController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callTypesController.getCallTypeByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const callTypes = <CallTypesModel>{
            enCallType: req.body.enCallType,
            arCallType: req.body.arCallType,
            Notes: req.body.Notes,
        };
        const result = await callTypesController.create(callTypes);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const callTypes = <CallTypesModel>{
            ID: Number(req.params.ID),
            enCallType: req.body.enCallType,
            arCallType: req.body.arCallType,
            Notes: req.body.Notes,
        };
        const result = await callTypesController.update(callTypes);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await callTypesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await callTypesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const CallTypesRouter = (app: express.Application) => {
    app.get('/call-types/:isActive', getAll);
    app.get('/call-types/:ID', getById);
    app.post('/call-types', create);
    app.put('/call-types/:ID', update);
    app.put('/call-types/deactivate/:ID', deactivate);
    app.put('/call-types/activate/:ID', activate);
};

export default CallTypesRouter;
