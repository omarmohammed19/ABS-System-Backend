import { mailController } from './Controller';
import express, { Request, Response } from 'express';

const mailcontroller = new mailController();

const sendMail = async (req: Request, res: Response) => {
    try {
        await mailcontroller.sendMail(req.body.to);
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
}

const matchOTP = async (req: Request, res: Response) => {
    try {
        const match = await mailcontroller.matchOTP(req.body.email, req.body.otp, req.body.username, req.body.contactNumber);
        if (match === false) {
            res.status(400).json({ message: "OTP Not Matched" });
        }
        else {
            res.status(200).json({ message: "OTP Matched" });
        }

    }
    catch (error) {
        // console.log(error);
        res.status(400).send(error);
    }
}

const mail_route = (app: express.Application) => {
    app.post('/sendmail', sendMail);
    app.post('/matchotp', matchOTP);
}

export default mail_route;