import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { ContactPersonType } from '../Models2/contactPersonTypesModel';
import { contactPersonTypesController } from '../Controllers2/contactPersonTypesController';

dotenv.config();

const contactpersontypesController = new contactPersonTypesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await contactpersontypesController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getContactPersonTypeByID = async (req: Request, res: Response) => {
    try {
        const result = await contactpersontypesController.getContactPersonTypeByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addContactPersonType = async (req: Request, res: Response) => {
    try {
        const contactPersonType: ContactPersonType = {
            contactPersonType: req.body.contactPersonType
        }
        const result = await contactpersontypesController.create(contactPersonType);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateContactPersonType = async (req: Request, res: Response) => {
    try {
        const contactPersonType: ContactPersonType = {
            ID: Number(req.params.id),
            contactPersonType: req.body.contactPersonType
        }
        const result = await contactpersontypesController.update(contactPersonType);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteContactPersonType = async (req: Request, res: Response) => {
    try {
        const result = await contactpersontypesController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const contactPersonTypesRouter = (app: express.Application) => {
    app.post('/contactPersonType', addContactPersonType);
    app.get('/contactPersonType/:id', getContactPersonTypeByID);
    app.get('/contactPersonType', getAll);
    app.put('/contactPersonType/:id', updateContactPersonType);
    app.delete('/contactPersonType/:id', deleteContactPersonType);
}

export default contactPersonTypesRouter;