import { mailController } from '../Controllers2/mailController';
import express, { Request, Response } from 'express';

const mailcontroller = new mailController();

const sendMail = async (req: Request, res: Response) => {
    try {
        await mailcontroller.sendMail(req.body.to, req.body.subject);
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const mail_route = (app: express.Application) => {
    app.post('/sendmail', sendMail);
}

export default mail_route;