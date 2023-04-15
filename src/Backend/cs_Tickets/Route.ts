import express, { Request, Response } from 'express';
import { TicketsController } from './Controller';
import { TicketsModel } from './Model';
import Sequalize from 'sequelize';

const ticketsController = new TicketsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const isClosed = Number(req.params.isClosed);
        const limit = Number(req.params.limit);
        const result = await ticketsController.index(language, isActive, isClosed, limit);
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
        const result = await ticketsController.getTicketByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const getByAWB = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const AWB = req.params.AWB;
        const result = await ticketsController.getTicketsByAWB(language, isActive, AWB);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getBySubAccountID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const isActive = Number(req.params.isActive);
        const subAccountID = Number(req.params.subAccountID);
        const limit = Number(req.params.subAccountID);
        const result = await ticketsController.getTicketsBySubAccountID(language, isActive, subAccountID, limit);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const ticket = <TicketsModel><unknown>{
            AWB: req.body.AWB,
            ticketTypeID: req.body.ticketTypeID,
            Description: req.body.Description,
            creationDate: Sequalize.literal('GETDATE()'),
            lastActionDate: Sequalize.literal('GETDATE()'),
            userID: req.body.userID,
            documentPath: req.body.documentPath,
        };
        const result = await ticketsController.create(ticket);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const ticket = <TicketsModel><unknown>{
            ID: Number(req.params.ID),
            AWB: req.body.AWB,
            ticketTypeID: req.body.ticketTypeID,
            ticketStatusID: req.body.ticketStatusID,
            Description: req.body.Description,
            creationDate : req.body.creationDate,
            lastActionDate: Sequalize.literal('GETDATE()'),
            userID: req.body.userID,
            documentPath: req.body.documentPath,
            isClosed: req.body.isClosed
        };
        const result = await ticketsController.update(ticket, language);
        res.json(result);
    } catch (error) {

        res.status(400);
        res.json(error);
    }
}

const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await ticketsController.deActivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await ticketsController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const ticketsRouter = (app: express.Application) => {
    app.get('/tickets/:isActive/:isClosed/:limit?', getAll);
    app.get('/tickets-by-id/:ID', getById);
    app.post('/tickets', create);
    app.put('/tickets/:ID', update);
    app.put('/tickets/de-activate/:ID', deActivate);
    app.put('/tickets/activate/:ID', activate);
    app.get('/tickets-by-awb/:AWB/:isActive', getByAWB);
    app.get('/tickets-by-sub-account-id/:subAccountID/:isActive/:limit?', getBySubAccountID);
}

export default ticketsRouter;