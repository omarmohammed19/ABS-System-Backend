import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { emailsController } from '../Controllers/EmailsController';

dotenv.config();

const makeEmailsRoute = new emailsController();

const getEmails = async (_req: Request, res: Response) => {
    try {
        const result = await makeEmailsRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getEmailsById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeEmailsRoute.get(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addEmails = async (req: Request, res: Response) => {
    try {
        const result = await makeEmailsRoute.add(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const updateEmails = async (req: Request, res: Response) => {
    try {
        const result = await makeEmailsRoute.update(
            {
                ID: parseInt(req.params.id),
                emailTypeID: req.body.emailTypeID,
                UserInfoID: req.body.UserInfoID,
                CompanyInfoID: req.body.CompanyInfoID,
                ContactPersonID: req.body.ContactPersonID,
                email: req.body.email
            }
        );
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteEmails = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeEmailsRoute.delete(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const checkEmails = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const result = await makeEmailsRoute.checkEmails(email);
        res.json(result);
    } catch (error) {
        res.status(500).send
    }
}

const emails_Route = (app: express.Application) => {
    app.get('/emails', getEmails);
    app.get('/emails/:id', getEmailsById);
    app.post('/checkemails', checkEmails);
    app.post('/emails', addEmails);
    app.put('/emails/:id', updateEmails);
    app.delete('/emails/:id', deleteEmails);
}

export default emails_Route;