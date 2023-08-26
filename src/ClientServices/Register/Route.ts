import express, { Request, Response } from 'express';
import { UsersController } from './Controller';
import { InfoModel } from '../../Backend/cust_Info/Model';
import { EmailsModel } from '../../Backend/cust_Emails/Model';
import { MainAccountsModel } from '../../Backend/cust_MainAccounts/Model';
import { SubAccountsModel } from '../../Backend/cust_SubAccounts/Model';
import { ContactNumbersModel } from '../../Backend/cust_ContactNumbers/Model';
import { UsersModel } from '../../Backend/sys_Users/Model';
import { ContactPersonsModel } from '../../Backend/cust_ContactPersons/Model';

const usersController = new UsersController();

const validateEmail = async (req: Request, res: Response) => {
    try{
        const email = req.body.email;
        const result = await usersController.validateEmail(email);
        res.json(result);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const validateUsername = async (req: Request, res: Response) => {
    try{
        const username = req.body.username;
        const result = await usersController.validateUsername(username);
        res.json(result);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const validateMobile = async (req: Request, res: Response) => {
    try{
        const mobile = req.body.mobile;
        const result = await usersController.validateMobile(mobile);
        res.json(result);
    }
    catch(err){
        res.status(400);
        res.json(err);
    }
}

const CreateGuestUser = async (req: Request, res: Response) => {
    try {
        const custInfo = <InfoModel>(<unknown>{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const ContactPerson = <ContactPersonsModel>(<unknown>{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const Email = <EmailsModel>(<unknown>{
            email: req.body.email,
        });

        const ContactNumber = <ContactNumbersModel>(<unknown>{
            contactNumber: req.body.contactNumber,
        });

        const User = <UsersModel>(<unknown>{
            username: req.body.username,
            password: req.body.password
        });

        const result = await usersController.CreateGuestUser(custInfo, Email, ContactPerson, ContactNumber, User);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const RegisterRouter = (app: express.Application) => {
    app.post('/register/guest', CreateGuestUser);
    app.post('/validate/email', validateEmail);
    app.post('/validate/username', validateUsername);
    app.post('/validate/mobile', validateMobile);
};
export default RegisterRouter;