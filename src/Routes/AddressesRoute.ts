import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { Address } from '../Models/AddressesModel';
import { AddressesController } from '../Controllers/AddressesController';

dotenv.config();

const addressesController = new AddressesController();

const getAll = async (req: Request, res: Response) => {
    try {
        const result = await addressesController.index();
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getAddressByID = async (req: Request, res: Response) => {
    try {
        const result = await addressesController.getAddressByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addAddress = async (req: Request, res: Response) => {
    try {
        const address: Address = {
            addressTypeID: req.body.addressTypeID,
            subAccountID: req.body.subAccountID,
            streetName: req.body.streetName,
            apartmentNumber: req.body.apartmentNumber,
            floorNumber: req.body.floorNumber,
            buildingNumber: req.body.buildingNumber,
            cityID: req.body.cityID,
            postalCode: req.body.postalCode
        }
        const result = await addressesController.create(address);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const updateAddress = async (req: Request, res: Response) => {
    try {
        const address: Address = {
            ID: Number(req.params.id),
            addressTypeID: req.body.addressTypeID,
            subAccountID: req.body.subAccountID,
            streetName: req.body.streetName,
            apartmentNumber: req.body.apartmentNumber,
            floorNumber: req.body.floorNumber,
            buildingNumber: req.body.buildingNumber,
            cityID: req.body.cityID,
            postalCode: req.body.postalCode
        }
        const result = await addressesController.update(address);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.send("Address not found")
    }
}

const deleteAddress = async (req: Request, res: Response) => {
    try {
        const result = await addressesController.delete(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const addressRouter = (app: express.Application) => {
    app.post('/address', addAddress);
    app.get('/address/:id', getAddressByID);
    app.get('/address', getAll);
    app.put('/address/:id', updateAddress);
    app.delete('/address/:id', deleteAddress);
}

export default addressRouter;