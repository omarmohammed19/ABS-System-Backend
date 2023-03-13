import express, { Request, Response } from 'express';
import { SalesChannelsController } from './Controller';
import { SalesChannelsModel } from './Model';

const salesChannelsController = new SalesChannelsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await salesChannelsController.index(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getAllDeActivated = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await salesChannelsController.indexDeActivated(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await salesChannelsController.getSubAccountsById(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const salesChannels = <SalesChannelsModel>{
            cmpInfoID: req.body.cmpInfoID,
            salesChannelName: req.body.salesChannelName,
            salesChannelURL: req.body.salesChannelURL,
            salesChannelTypeID: req.body.salesChannelTypeID,
        };
        const result = await salesChannelsController.create(salesChannels);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const salesChannels = <SalesChannelsModel>{
            ID: Number(req.params.ID),
            cmpInfoID: req.body.cmpInfoID,
            salesChannelName: req.body.salesChannelName,
            salesChannelURL: req.body.salesChannelURL,
            salesChannelTypeID: req.body.salesChannelTypeID,
        };
        const result = await salesChannelsController.update(salesChannels, language);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await salesChannelsController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await salesChannelsController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const salesChannelsRouter = (app: express.Application) => {
    app.get('/sales-channels', getAll);
    app.get('/sales-channels/de-activated', getAllDeActivated);
    app.get('/sales-channels/:ID', getById);
    app.post('/sales-channels', create);
    app.put('/sales-channels/:ID', update);
    app.put('/sales-channels/de-activate/:ID', deactivate);
    app.put('/sales-channels/activate/:ID', activate);
};

export default salesChannelsRouter;
