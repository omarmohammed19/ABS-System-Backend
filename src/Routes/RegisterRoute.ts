import { RegisterController } from '../Controllers/RegisterController';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const makeRegisterRoute = new RegisterController();

const register = async (req: Request, res: Response) => {
    try {
        const result = await makeRegisterRoute.create(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const register_router = (app: express.Application) => {
    app.post('/register', register);
}

export default register_router;