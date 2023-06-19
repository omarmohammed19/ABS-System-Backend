import express, { Request, Response } from 'express';
import { UserSessionsController } from './Controller';
import { UserSessionsModel } from './Model';
import Sequalize from 'sequelize';

const userSessionsController = new UserSessionsController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await userSessionsController.index(language, Number(req.params.isActive));
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getUserSessionByID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await userSessionsController.getUserSessionByUserID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const create = async (req: Request, res: Response) => {
    try {
        const userSession = <UserSessionsModel><unknown>{
            userID: Number(req.body.userID),
            loginTime: Sequalize.literal('GETDATE()'),
            logoutTime: req.body.logoutTime,
            isActive: req.body.isActive,
        };
        const result = await userSessionsController.create(userSession);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const userSession = <UserSessionsModel>{
            ID: Number(req.params.ID),
            userID: Number(req.body.userID),
            loginTime: req.body.loginTime,
            logoutTime: req.body.logoutTime,
        };
        const result = await userSessionsController.update(userSession);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const deactivate = async (req: Request, res: Response) => {
    try {
        const result = await userSessionsController.deactivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const activate = async (req: Request, res: Response) => {
    try {
        const result = await userSessionsController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const userSessionsRouter = (app: express.Application) => {
    app.get('/user-sessions/:isActive', getAll);
    app.get('/user-sessions-by-user-id/:ID', getUserSessionByID);
    app.post('/user-sessions', create);
    app.put('/user-sessions/:ID', update);
    app.put('/user-sessions/deactivate/:ID', deactivate);
    app.put('/user-sessions/activate/:ID', activate);
};

export default userSessionsRouter;






