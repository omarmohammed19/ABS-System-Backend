import express, { Request, Response } from 'express';
import { DisplayedStatusController } from './Controller';
import { DisplayedStatusModel } from './Model';
import Sequalize from 'sequelize';

const statusController = new DisplayedStatusController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await statusController.index(language);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await statusController.getPrevStatusByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const status = <DisplayedStatusModel>(<unknown>{
            enDisplayedStatus: req.body.enDisplayedStatus,
            arDisplayedStatus: req.body.arDisplayedStatus,
            Notes: req.body.Notes,
        });
        const result = await statusController.create(status);
        res.json(result);
    } catch (error) {
        console.log('🚀 ~ file: Route.ts:43 ~ create ~ error:', error);
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const status = <DisplayedStatusModel>(<unknown>{
            ID: req.params.ID,
            enDisplayedStatus: req.body.enDisplayedStatus,
            arDisplayedStatus: req.body.arDisplayedStatus,
            Notes: req.body.Notes,
        });
        const result = await statusController.update(language, status);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await statusController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await statusController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const custStatusRouter = (app: express.Application) => {
    app.get('/displayed-status', getAll);
    app.get('/displayed-status-by-ID/:ID', getById);
    app.post('/displayed-status', create);
    app.put('/displayed-status/:ID', update);
    app.put('/displayed-status/de-activate/:ID', deactivate);
    app.put('/displayed-status/activate/:ID', activate);
};

export default custStatusRouter;
