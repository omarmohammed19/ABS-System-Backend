import { mobileNumberController } from './../Controllers2/mobileNumberController';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const makeMobileNumberRoute = new mobileNumberController();

const getMobileNumbers = async (_req: Request, res: Response) => {
    try {
        const result = await makeMobileNumberRoute.index();
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getMobileNumberById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeMobileNumberRoute.get(id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addMobileNumber = async (req: Request, res: Response) => {
    try {
        const result = await makeMobileNumberRoute.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateMobileNumber = async (req: Request, res: Response) => {
    try {
        const result = await makeMobileNumberRoute.update(
            {
                ID: parseInt(req.params.id),
                userInfoID: req.body.userInfoID,
                companyInfoID: req.body.companyInfoID,
                contactPersonID: req.body.contactPersonID,
                mobileNumber: req.body.mobileNumber,
                mobileTypeID: req.body.mobileTypeID
            }
        );
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteMobileNumber = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await makeMobileNumberRoute.delete(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

const checkMobiles = async (req: Request, res: Response) => {
    try {
        const mobile = req.body.mobile;
        const result = await makeMobileNumberRoute.checkMobiles(mobile);
        res.json(result);
    } catch (error) {
        res.status(500).send
    }
}

const mobileNumber_Route = (app: express.Application) => {
    app.get('/mobileNumbers', getMobileNumbers);
    app.get('/mobileNumber/:id', getMobileNumberById);
    app.post('/mobileNumber', addMobileNumber);
    app.post('/checkMobiles', checkMobiles);
    app.put('/mobileNumber/:id', updateMobileNumber);
    app.delete('/mobileNumber/:id', deleteMobileNumber);
}

export default mobileNumber_Route;