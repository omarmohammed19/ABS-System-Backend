import express, { Request, Response } from 'express'
import { Router } from 'express'
import dotenv from 'dotenv';
import { mobileTypesController } from '../Controllers/mobileTypesController'
import { MobileType } from '../Models/mobileTypes';


const mobileTypesRouter = express.Router();
const m1 = new mobileTypesController();


async function getMobileTypes(req: Request, res: Response) {
    try {
        const mobileTypes = await m1.index();
        res.status(200).json(mobileTypes);
    } catch (error) {
        res.status(500).json("Could not get mobileTypes");
    }
}

async function addMobileType(req: Request, res: Response) {
    try {
        const mobileType = await m1.addMobileType(req.body);
        console.log(mobileType);
        res.status(200).json(mobileType);
    } catch (error) {
        res.status(500).json("Could not add mobileType");
    }
}

async function updateMobileType(req: Request, res: Response) {
    try {
        const mt: MobileType = {
            ID: Number(req.params.id),
            mobileType: req.body.mobileType
        }
        const mobileType = await m1.updateMobileType(mt);
        console.log(mobileType);
        res.status(200).json(mobileType);
    } catch (error) {
        res.status(500).json("Could not update mobileType");
        console.log(error);
    }
}

async function deleteMobileType(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const mobileType = await m1.deleteMobileType(id);
        console.log(mobileType);
        res.status(200).json(mobileType);
    } catch (error) {
        res.status(500).json("Could not delete mobileType");
    }
}

async function getMobileTypeByID(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const mobileType = await m1.getMobileType(id);
        console.log(mobileType);
        res.status(200).json(mobileType);
    } catch (error) {
        res.status(500).json("Could not get mobileType");
    }
}





const mobileTypes_Routes = (app: express.Application) => {
    app.get('/mobileTypes/get', getMobileTypes);
    app.post('/mobileTypes/add', addMobileType);
    app.put('/mobileTypes/update/:id', updateMobileType);
    app.delete('/mobileTypes/delete/:id', deleteMobileType);
    app.get('/mobileTypes/get/:id', getMobileTypeByID);
}

export default mobileTypes_Routes;
