import express, { Request, Response } from 'express';
import { TicketTypesController } from './Controller';
import { TicketTypesModel } from './Model';

const ticketTypesController = new TicketTypesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await ticketTypesController.index(language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await ticketTypesController.getTicketTypeByID(language, Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const ticketTypes = <TicketTypesModel>{
            enTicketType: req.body.enTicketType,
            arTicketType: req.body.arTicketType,
            Notes: req.body.Notes,
        };
        const result = await ticketTypesController.create(ticketTypes);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const ticketTypes = <TicketTypesModel>{
            ID: Number(req.params.ID),
            enTicketType: req.body.enTicketType,
            arTicketType: req.body.arTicketType,
            Notes: req.body.Notes,
        };
        const result = await ticketTypesController.update(ticketTypes);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await ticketTypesController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await ticketTypesController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const TicketTypesRouter = (app: express.Application) => {
    app.get('/ticket-types', getAll);
    app.get('/ticket-types/:ID', getById);
    app.post('/ticket-types', create);
    app.put('/ticket-types/:ID', update);
    app.put('/ticket-types/deactivate/:ID', deactivate);
    app.put('/ticket-types/activate/:ID', activate);
};

export default TicketTypesRouter;
