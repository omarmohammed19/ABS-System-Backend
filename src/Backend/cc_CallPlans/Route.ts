import express, { Request, Response } from 'express';
import { CallPlansController } from './Controller';
import { CallPlansModel } from './Model';

const callPlansController = new CallPlansController();

const getAll = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const limit = Number(req.params.limit);
        const result = await callPlansController.index(language, limit);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json(error);
    }
};

const getById = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const result = await callPlansController.getCallPlanByID(Number(req.params.ID), language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const getByUserID = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        //@ts-ignore
        const userID = req.userID
        const result = await callPlansController.getByUserID(userID, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};


const create = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userID = req.userID
        const callPlan = <CallPlansModel>(<unknown>{
            AWB: req.body.AWB,
            callTypeID: req.body.callTypeID,
            callStatusID: 1,
            assignedBy: userID,
            assignedTo: req.body.assignedTo,
            Notes: req.body.Notes
        });
        const result = await callPlansController.create(callPlan);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const userID = req.userID
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const callPlan = <CallPlansModel>(<unknown>{
            ID: Number(req.params.ID),
            AWB: req.body.AWB,
            callTypeID: req.body.callTypeID,
            callStatusID: req.body.callStatusID,
            callResultID: req.body.callResultID,
            assignedBy: userID,
            assignedTo: req.body.assignedTo,
            assignedAt: req.body.assignedAt,
            callDate: req.body.callDate,
            Notes: req.body.Notes
        });
        const result = await callPlansController.update(callPlan, language);
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(400);
        res.json(error);
    }
};

const updateResult = async (req: Request, res: Response) => {
    try {
        const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
        const callPlan = <CallPlansModel>(<unknown>{
            ID: Number(req.params.ID),
            callResultID: req.body.callResultID,
        });
        const result = await callPlansController.updateResult(callPlan, language);
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


const deActivate = async (req: Request, res: Response) => {
    try {
        const result = await callPlansController.deActivate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const activate = async (req: Request, res: Response) => {
    try {
        const result = await callPlansController.activate(Number(req.params.ID));
        res.json(result);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
};

const callPlansRouter = (app: express.Application) => {
    app.get('/call-plans/:limit?', getAll);
    app.get('/call-plans-by-id/:ID', getById);
    app.get('/call-plans-by-user-id', getByUserID);
    app.post('/call-plans', create);
    app.put('/call-plans/:ID', update);
    app.put('/call-plans-result/:ID', updateResult);
    app.delete('/call-plans/de-activate/:ID', deActivate);
    app.put('/call-plans/activate/:ID', activate);
};

export default callPlansRouter;
