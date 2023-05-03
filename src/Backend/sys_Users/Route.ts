import express, { Request, Response } from 'express';
import { UsersController } from './Controller';
import { UsersModel } from './Model';
import verifyJWT from '../../Middlewares/verifyJWT';

const usersController = new UsersController();

const getAllClients = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await usersController.indexClients(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await usersController.indexEmployees(language, Number(req.params.isActive), Number(req.params.limit));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const result = await usersController.getUserById(language, Number(userId));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const GetPersonalInfoById = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const subAccountID = req.subAccountID;
    const result = await usersController.getPersonalInfoById(Number(subAccountID));
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
      avatar: req.body.avatar,
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
    // @ts-ignore
    const userId = req.userID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const user = <UsersModel>{
      ID: Number(userId),
      username: req.body.username,
      password: req.body.password,
      subAccountID: req.body.subAccountID,
      displayedName: req.body.displayedName,
      roleID: req.body.roleID,
      avatar: req.body.avatar,
    };
    const result = await usersController.update(user, language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userID;
    const user = <UsersModel>{
      ID: Number(userId),
      password: req.body.password,
    };
    const oldPassword = req.body.oldPassword;
    const result = await usersController.changePassword(user, oldPassword);
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
  app.get('/cust-users/:isActive/:limit', getAllClients);
  app.get('/emp-users/:isActive/:limit', getAllEmployees);
  app.get('/users-with-info', GetPersonalInfoById);
  app.get('/users', getById);
  app.post('/users', create);
  app.put('/users', update);
  app.put('/change/password', changePassword);
  app.put('/users/de-activate/:ID', deactivate);
  app.put('/users/activate/:ID', activate);
};

export default usersRouter;
