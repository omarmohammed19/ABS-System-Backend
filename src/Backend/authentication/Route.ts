import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { UsersController } from './Controller';
import { UsersModel } from './Model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const usersController = new UsersController();

const handleLogin = async (req: Request, res: Response) => {
  try {
    const result = await usersController.handleLogin(req.body.username, req.body.password);
    const user = result as UsersModel;
    if (!result) {
      return res.sendStatus(401); //Unauthorized
    }
    if (user.isActive === false) {
      return res.sendStatus(404).json('User not found');
    }
    try {
      const match = await bcrypt.compareSync(req.body.password + process.env.pepper, user.password);
      if (match) {
        const id = user.ID;
        const name = user.displayedName;
        const role = user.roleID;
        const subAccountID = user.subAccountID;
        const message = 'success';
        // create JWTs
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: id,
              name: name,
              role: role,
              subAccountID: subAccountID,
            },
          },
          //@ts-ignore
          process.env.TOKEN_SECRET
        );
        // set cookies
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.json({ id, name, accessToken, message });
      } else {
        console.log('Username or password is incorrect');
        return res.sendStatus(401);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(400); //Unauthorized
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400); //Unauthorized
  }
};

const handlesignin_client = async (req: Request, res: Response) => {
  try {
    const result: any = await usersController.handlesignin_client(req.body.userCred, req.body.password);
    const user = result.result[0] as UsersModel;
    const userRoles = result.Roles.map((role: any) => role.roleID).join(',');

    if (!user) {
      return res.json('User not found');
    }

    if (result.length === 0) {
      return res.json('User not found');
    }
    if (user.isActive === false) {
      return res.status(201).json(user);
    }
    try {
      const match = await bcrypt.compareSync(req.body.password + process.env.pepper, user.password);

      if (match) {
        const id = user.ID;
        const name = user.displayedName;
        const role = userRoles;
        const subAccountID = user.subAccountID;
        //@ts-ignore
        const mainAccountID = user.mainAccountID;
        //@ts-ignore
        const roleTypeID = user.roleTypeID;
        const message = 'success';
        // create JWTs
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: id,
              name: name,
              role: role,
              subAccountID: subAccountID,
              mainAccountID: mainAccountID,
              roleTypeID: roleTypeID,
            },
          },
          //@ts-ignore
          process.env.TOKEN_SECRET
        );
        // set cookies
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.json({ id, name, accessToken, message });
      } else {
        console.log('Username or password is incorrect');
        return res.sendStatus(401);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(400); //Unauthorized
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400); //Unauthorized
  }
};

const handlesignin_employee = async (req: Request, res: Response) => {
  try {
    const result: any = await usersController.handlesignin_employee(req.body.userCred, req.body.password);
    const user = result.result[0] as UsersModel;
    const userRoles = result.Roles.map((role: any) => role.roleID).join(',');
    if (!user) {
      return res.json('User not found');
    }

    if (result.length === 0) {
      return res.json('User not found');
    }
    if (user.isActive === false) {
      return res.status(201).json(user);
    }
    try {
      const match = await bcrypt.compareSync(req.body.password + process.env.pepper, user.password);
      if (match) {
        const id = user.ID;
        const name = user.displayedName;
        const role = userRoles;
        //@ts-ignore
        const branchID = user.branchID;
        //@ts-ignore
        const departmentID = user.departmentID;
        //@ts-ignore
        const roleTypeID = user.roleTypeID;
        //@ts-ignore
        const employeeID = user.employeeID;
        //@ts-ignore
        const titleID = user.titleID;
        const message = 'success';
        // create JWTs
        const accessToken = jwt.sign(
          {
            UserInfo: {
              id: id,
              name: name,
              role: role,
              branchID: branchID,
              departmentID: departmentID,
              roleTypeID: roleTypeID,
              employeeID: employeeID,
              titleID: titleID,
            },
          },
          //@ts-ignore
          process.env.TOKEN_SECRET
        );
        // set cookies
        res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
        res.json({ id, name, accessToken, message });
      } else {
        console.log('Username or password is incorrect');
        return res.sendStatus(401);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(400); //Unauthorized
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(400); //Unauthorized
  }
};

const AuthenticationRouter = (app: express.Application) => {
  app.post('/auth', handleLogin);
  app.post('/signin-client', handlesignin_client);
  app.post('/signin-employee', handlesignin_employee);
};

export default AuthenticationRouter;
