import express, { Request, Response } from 'express';
import { TicketActionsController } from './Controller';
import { TicketActionsModel } from './Model';
import Sequalize from 'sequelize';

const ticketActionsController = new TicketActionsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await ticketActionsController.index(language);
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
        const result = await ticketActionsController.getTicketActionByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {        
        res.status(400);
        res.json(error);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userID = req.userID
        const ticket = <TicketActionsModel>(<unknown>{
            ticketID: req.body.ticketID,
            ticketStatusID: req.body.ticketStatusID,
            userID: userID,
            actionDate: Sequalize.literal('GETDATE()'),
            assignedDepartmentID: req.body.assignedDepartmentID,
            assignedCustomerServiceID: req.body.assignedCustomerServiceID,
            Notes: req.body.Notes,
        });

        const result = await ticketActionsController.create(ticket);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const assignTicket = async (req: Request, res: Response) => {
    try {        
        //@ts-ignore
        const userID = req.userID
        const ticket = <TicketActionsModel>(<unknown>{
            ticketID: req.body.ticketID,
            ticketStatusID: req.body.ticketStatusID,
            userID: userID,
            actionDate: Sequalize.literal('GETDATE()'),
            assignedDepartmentID: req.body.assignedDepartmentID,
            assignedCustomerServiceID: req.body.assignedCustomerServiceID,
            Notes: req.body.Notes,
        });

        const result = await ticketActionsController.assignTicket(ticket);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userID = req.userID
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const ticket = <TicketActionsModel>(<unknown>{
            ID: Number(req.params.ID),
            ticketID: req.body.ticketID,
            ticketStatusID: req.body.ticketStatusID,
            userID: userID,
            actionDate: Sequalize.literal('GETDATE()'),
            assignedDepartmentID: req.body.assignedDepartmentID,
            assignedCustomerServiceID: req.body.assignedCustomerServiceID,
            Notes: req.body.Notes,
        });
        const result = await ticketActionsController.update(ticket, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await ticketActionsController.deActivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await ticketActionsController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const ticketActionsRouter = (app: express.Application) => {
    app.get('/ticket-action', getAll);
    app.get('/ticket-action-by-id/:ID', getById);
    app.post('/ticket-action', create);
    app.put('/ticket-action/:ID', update);
    app.post('/assign-ticket', assignTicket);
    app.put('/ticket-action/de-activate/:ID', deActivate);
    app.put('/ticket-action/activate/:ID', activate);
};

export default ticketActionsRouter;
