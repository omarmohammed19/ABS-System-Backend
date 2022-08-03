import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { AddressType } from '../Models/addressTypesModel';
import { addressTypesController } from '../Controllers/addressTypesController';

dotenv.config();

const addresstypesController = new addressTypesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await addresstypesController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getAddressTypeByID = async (req: Request, res: Response) => {
    try {
        const result = await addresstypesController.getAddressTypeByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addAddressType = async (req: Request, res: Response) => {
    try {
        const addressType: AddressType = {
            addressType: req.body.addressType
        }
        const result = await addresstypesController.create(addressType);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateAddressType = async (req: Request, res: Response) => {
    try {
        const addressType: AddressType = {
            addressTypeID: Number(req.params.id),
            addressType: req.body.addressType
        }
        const result = await addresstypesController.update(addressType);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const deleteAddressType = async (req: Request, res: Response) => {
    try {
        const result = await addresstypesController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}


const addressTypesRouter = (app: express.Application) => {
    app.post('/addressType', addAddressType);
    app.get('/addressType/:id', getAddressTypeByID);
    app.get('/addressType', getAll);
    app.put('/addressType/:id', updateAddressType);
    app.delete('/addressType/:id', deleteAddressType);
}

export default addressTypesRouter;