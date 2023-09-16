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

const GetClientPersonalInfoById = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userID = req.userID;
    const result = await usersController.getClientPersonalInfoById(Number(userID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const GetEmployeePersonalInfoById = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userID = req.userID;

    const result = await usersController.getEmployeePersonalInfoById(Number(userID));
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

const updateAvatar = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userID;
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    const user = <UsersModel>{
      ID: Number(userId),
      avatar: req.body.avatar,
    };
    const result = await usersController.updateAvatar(user, language);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
}

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

const getEmployeeUsernames = async (req: Request, res: Response) => {
  try {
    const result = await usersController.getEmployeeUsernames();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const adminChangePassword = async (req: Request, res: Response) => {
  try {
    const user = <UsersModel>{
      ID: Number(req.params.ID),
      password: req.body.password,
    };
    const result = await usersController.adminChangePassword(user);
    res.json(result);
  } catch (error) {
    console.log(error);

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
  app.get('/users-with-info-client', GetClientPersonalInfoById);
  app.get('/users-with-info-employee', GetEmployeePersonalInfoById);
  app.get('/users', getById);
  app.post('/users', create);
  app.put('/users', update);
  app.put('/user-avatar', updateAvatar);
  app.put('/change/password', changePassword);
  app.put('/users/de-activate/:ID', deactivate);
  app.put('/users/activate/:ID', activate);
  app.get('/users/employee-usernames', getEmployeeUsernames);
  app.put('/users/admin-change-password/:ID', adminChangePassword);
};

export default usersRouter;
