import express, { Request, Response } from 'express';
import { UsersController } from './Controller';
import { UsersModel } from './Model';
import verifyJWT from '../../Middlewares/verifyJWT';

const usersController = new UsersController();

const getAll = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await usersController.index(language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await usersController.getUserById(language, Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user = <UsersModel>{
      username: req.body.username,
      password: req.body.password,
      subAccountID: req.body.subAccountID,
      displayedName: req.body.displayedName,
      roleID: req.body.roleID,
      avatar: req.body.avatar
    };
    const result = await usersController.create(user);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const user = <UsersModel>{
      ID: Number(req.params.ID),
      username: req.body.username,
      password: req.body.password,
      subAccountID: req.body.subAccountID,
      displayedName: req.body.displayedName,
      roleID: req.body.roleID,
      avatar: req.body.avatar
    };
    const result = await usersController.update(user);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const deactivate = async (req: Request, res: Response) => {
  try {
    const result = await usersController.deactivate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const activate = async (req: Request, res: Response) => {
  try {
    const result = await usersController.activate(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const usersRouter = (app: express.Application) => {
  app.get('/users', getAll);
  app.get('/users/:ID', getById);
  app.post('/users', create);
  app.put('/users/:ID', update);
  app.put('/users/deactivate/:ID', deactivate);
  app.put('/users/activate/:ID', activate);
};

export default usersRouter;
