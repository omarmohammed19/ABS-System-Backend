import express, { Request, Response } from 'express';
import { TicketStatusController } from './Controller';
import { TicketStatusModel } from './Model';

const ticketStatusController = new TicketStatusController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await ticketStatusController.index(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await ticketStatusController.getTicketStatusByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const ticketStatus = <TicketStatusModel>{
            enStatus: req.body.enStatus,
            arStatus: req.body.arStatus,
            Notes: req.body.Notes,
        };
        const result = await ticketStatusController.create(ticketStatus);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const ticketStatus = <TicketStatusModel>{
            ID: Number(req.params.ID),
            enStatus: req.body.enStatus,
            arStatus: req.body.arStatus,
            Notes: req.body.Notes,
        };
        const result = await ticketStatusController.update(ticketStatus);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await ticketStatusController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await ticketStatusController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const TicketStatusRouter = (app: express.Application) => {
    app.get('/ticket-status', getAll);
    app.get('/ticket-status/:ID', getById);
    app.post('/ticket-status', create);
    app.put('/ticket-status/:ID', update);
    app.put('/ticket-status/deactivate/:ID', deactivate);
    app.put('/ticket-status/activate/:ID', activate);
};

export default TicketStatusRouter;
