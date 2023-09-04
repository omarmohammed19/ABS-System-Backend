import express, { Request, Response } from 'express';
import { CallHistoryController } from './Controller';
import { CallHistoryModel } from './Model';

const callHistoryController = new CallHistoryController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const limit = Number(req.params.limit);
        const result = await callHistoryController.index(language, limit);
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
        const result = await callHistoryController.getByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getByAWB = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callHistoryController.getByAWB(String(req.params.AWB), language);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userID = req.userID
        const callHistory = <CallHistoryModel>(<unknown>{
            AWB: req.body.AWB,
            callTypeID: req.body.callTypeID,
            callStatusID: req.body.callTypeID,
            callResultID: req.body.callResultID,
            assignedBy: req.body.assignedBy,
            assignedTo: userID,
            assignedAt: req.body.assignedAt,
            callDate: req.body.callDate,
            Notes: req.body.Notes
        });
        const result = await callHistoryController.create(callHistory);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userID = req.userID
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const callHistory = <CallHistoryModel>(<unknown>{
            ID: Number(req.params.ID),
            AWB: req.body.AWB,
            callTypeID: req.body.callTypeID,
            callStatusID: req.body.callStatusID,
            callResultID: req.body.callResultID,
            assignedBy: req.body.assignedBy,
            assignedTo: userID,
            assignedAt: req.body.assignedAt,
            callDate: req.body.callDate,
            Notes: req.body.Notes
        });
        const result = await callHistoryController.update(callHistory, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await callHistoryController.deActivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await callHistoryController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const callHistoryRouter = (app: express.Application) => {
    app.get('/call-history/:limit?', getAll);
    app.get('/call-history-by-id/:ID', getById);
    app.get('/call-history-by-AWB/:AWB', getByAWB);
    app.post('/call-history', create);
    app.put('/call-history/:ID', update);
    app.delete('/call-history/de-activate/:ID', deActivate);
    app.put('/call-history/activate/:ID', activate);
};

export default callHistoryRouter;
