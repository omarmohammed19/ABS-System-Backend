import express, { Request, Response } from 'express';
import { AddMembersController } from './Controller';

const addMembersController = new AddMembersController();

const getRoles = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const roleTypeID = req.roleTypeID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await addMembersController.getRoles(language, roleTypeID);
    res.json(result);
  }
  catch (err) {
    console.log(err);
    
    res.status(400);
    res.json(err);
  }
}

const AddMembersRouter = (app: express.Application) => {
  app.get('/roles', getRoles);
};
export default AddMembersRouter;
