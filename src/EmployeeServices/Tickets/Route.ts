import express, { Request, Response } from 'express';
import { EmployeeTicketsController } from './Controller';

const employeeTicketsController = new EmployeeTicketsController();

const getAllTickets = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const limit = Number(req.params.limit) || 10;

        const result = await employeeTicketsController.getAllTickets(language, limit);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getOpenedTickets = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const limit = Number(req.params.limit) || 10;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;

        const result = await employeeTicketsController.getOpenedTickets(language, limit, fromDate, toDate);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getClosedTickets = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const limit = Number(req.params.limit) || 10;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const result = await employeeTicketsController.getClosedTickets(language, limit, fromDate, toDate);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getTicketsByStatusID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';

        const limit = Number(req.params.limit) || 10;
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;
        const statusID = Number(req.params.statusID) ? Number(req.params.statusID) : null;

        //@ts-ignore
        const result = await employeeTicketsController.getTicketsByStatusID(language, limit, fromDate, toDate, statusID);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
}

const getTicketByID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const ID = Number(req.params.ID);

        const result = await employeeTicketsController.getTicketByID(language, ID);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getTicketByAWB = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const AWB = req.params.AWB;

        const result = await employeeTicketsController.getTicketByAWB(language, AWB);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getTicketBySubAccountID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const subAccountID = Number(req.params.subAccountID);

        const result = await employeeTicketsController.getTicketBySubAccountID(language, subAccountID);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getTicketByMainAccountID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const mainAccountID = Number(req.params.mainAccountID);

        const result = await employeeTicketsController.getTicketByMainAccountID(language, mainAccountID);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getTicketByCreationDateRange = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const fromDate = req.body.fromDate;
        const toDate = req.body.toDate;

        const result = await employeeTicketsController.getTicketByCreationDateRange(language, fromDate, toDate);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const EmployeeTicketsRouter = (app: express.Application) => {
    app.get('/all-tickets-for-employee/:limit', getAllTickets);
    app.post('/opened-tickets-for-employee/:limit', getOpenedTickets);
    app.post('/closed-tickets-for-employee/:limit', getClosedTickets);
    app.post('/tickets-by-status-id-for-employee/:limit/:statusID', getTicketsByStatusID);
    app.get('/ticket-by-id-for-employee/:ID', getTicketByID);
    app.get('/tickets-by-awb-for-employee/:AWB', getTicketByAWB);
    app.get('/tickets-by-sub-account-id-for-employee/:subAccountID', getTicketBySubAccountID);
    app.get('/tickets-by-main-account-id-for-employee/:mainAccountID', getTicketByMainAccountID);
    app.post('/tickets-by-creation-date-range-for-employee', getTicketByCreationDateRange);
};

export default EmployeeTicketsRouter;