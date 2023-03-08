import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { ContactPerson } from '../Models2/contactPersonModel';
import { contactPersonController } from '../Controllers2/contactPersonController';

dotenv.config();

const contactpersonController = new contactPersonController();

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await contactpersonController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getContactPersonByID = async (req: Request, res: Response) => {
    try {
        const result = await contactpersonController.getContactPersonByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addContactPerson = async (req: Request, res: Response) => {
    try {
        const contactPerson: ContactPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            subAccountID: Number(req.body.subAccountID),
            contactPersonTypeID: Number(req.body.contactPersonTypeID)
        }
        const result = await contactpersonController.create(contactPerson);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateContactPerson = async (req: Request, res: Response) => {
    try {
        const contactPerson: ContactPerson = {
            ID: Number(req.params.id),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            subAccountID: Number(req.body.subAccountID),
            contactPersonTypeID: Number(req.body.contactPersonTypeID)
        }
        const result = await contactpersonController.update(contactPerson);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteContactPerson = async (req: Request, res: Response) => {
    try {
        const result = await contactpersonController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const contactPersonRouter = (app: express.Application) => {
    app.post('/contactPerson', addContactPerson);
    app.get('/contactPerson/:id', getContactPersonByID);
    app.get('/contactPerson', getAll);
    app.put('/contactPerson/:id', updateContactPerson);
    app.delete('/contactPerson/:id', deleteContactPerson);
}

export default contactPersonRouter;