import express, { Request, Response } from 'express';
import { MessageStatusController } from './Controller';
import { MessageStatusModel } from './Model';

const messageStatusController = new MessageStatusController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await messageStatusController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await messageStatusController.getMessageStatusByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const messageStatuss = <MessageStatusModel>{
            enMessageStatusType: req.body.enMessageStatusType,
            arMessageStatusType: req.body.arMessageStatusType,
            Notes: req.body.Notes,
        };
        const result = await messageStatusController.create(messageStatuss);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const messageStatuss = <MessageStatusModel>{
            ID: Number(req.params.ID),
            enMessageStatusType: req.body.enMessageStatusType,
            arMessageStatusType: req.body.arMessageStatusType,
            Notes: req.body.Notes,
        };
        const result = await messageStatusController.update(messageStatuss);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await messageStatusController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await messageStatusController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const MessageStatusRouter = (app: express.Application) => {
    app.get('/message-status/:isActive', getAll);
    app.get('/message-status-by-id/:ID', getById);
    app.post('/message-status', create);
    app.put('/message-status/:ID', update);
    app.put('/message-status/deactivate/:ID', deactivate);
    app.put('/message-status/activate/:ID', activate);
};

export default MessageStatusRouter;
