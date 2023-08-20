import express, { Request, Response } from 'express';
import { UserRolesController } from './Controller';
import { UsersRolesModel } from './Model';
import verifyJWT from '../../Middlewares/verifyJWT';

const userRolesController = new UserRolesController();

const postRoles = async (req: Request, res: Response) => {
  try {
    await userRolesController.postRoles(Number(req.params.ID), req.body.ROLES);
    res.json('Roles are inserted successfully !');
  } catch (error) {
    console.log(error);

    res.status(400);
    res.json(error);
  }
};

const getRolesByUserID = async (req: Request, res: Response) => {
  try {
    const result = await userRolesController.getRolesByUserID(Number(req.params.ID));
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
    console.log(error);
  }
};

const deActivateRoles = async (req: Request, res: Response) => {
  try {
    const result = await userRolesController.deActivateRoles(Number(req.params.ID), req.body.ROLES);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
    console.log(error);
  }
};

const UserRolesRouter = (app: express.Application) => {
  app.post('/user-roles/:ID', postRoles);
  app.get('/user-roles/:ID', getRolesByUserID);
  app.put('/user-roles/deactivate/:ID', deActivateRoles);
};

export default UserRolesRouter;
