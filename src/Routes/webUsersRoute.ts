import express, { Request, Response } from 'express';
import { webUsersController } from '../Controllers/webUsersController';

const webUserRouter = express.Router();
const webUser = new webUsersController();

async function getWebUsersByID(req: Request, res: Response) {
  try {
    const user = await webUser.getWebUsersByID(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}


async function addWebUser(req: Request, res: Response) {
  try {
    const user = await webUser.addWebUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not add a new user');
  }
}

async function getWebUsers(req: Request, res: Response) {
  try {
    const user = await webUser.getwebUsers();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the users');
  }
}

async function deleteWebUser(req: Request, res: Response) {
  try {
    const user = await webUser.deleteWebUser(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not delete the user');
  }
}

async function updateWebUser(req: Request, res: Response) {
  try {
    const user = await webUser.updateWebUser({
      ID: Number(req.params.id),
      userName: req.body.userName,
      webUserPassword: req.body.webUserPassword,
      Roles: Number(req.body.Roles),
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json('The user is not found');
  }
}

async function activateUser(req: Request, res: Response) {
  try {
    const user = await webUser.activateUser(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

async function deactivateUser(req: Request, res: Response) {
  try {
    const user = await webUser.deactivateUser(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

async function checkUsername(req: Request, res: Response) {
  try {
    const user = await webUser.checkUsername(req.body.userName);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json('Could not get the user');
  }
}

const webUser_endpoints = (app: express.Application) => {
  app.get('/webUser/get/:id', getWebUsersByID);
  app.get('/webUser/get', getWebUsers);
  app.post('/webUser/add', addWebUser);
  app.delete('/webUser/delete/:id', deleteWebUser);
  app.put('/webUser/update/:id', updateWebUser);
  app.put('/webUser/activate/:id', activateUser);
  app.put('/webUser/deactivate/:id', deactivateUser);
  app.post('/webUser/checkusername', checkUsername);
};

export default webUser_endpoints;
