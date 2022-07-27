import { Test } from './../Models/test';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const maketest = new Test();

const getTest = async (_req: Request, res: Response) => {
    try {
        const result = await maketest.index();
        res.json(result);
    } catch (error) {
        res.send(error);
    }
}

const test_Routes = (app: express.Application) => {
    app.get('/', getTest);
}

export default test_Routes;
