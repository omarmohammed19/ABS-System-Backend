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
const UserRolesRouter = (app: express.Application) => {
  app.post('/user-roles/:ID', postRoles);
};

export default UserRolesRouter;
