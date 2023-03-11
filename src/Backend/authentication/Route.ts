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
      return res.sendStatus(404).json("User not found");
    }
    try {
      const match = await bcrypt.compareSync(req.body.password + process.env.pepper, user.password);
      if (match) {
        const id = user.ID;
        const name = user.displayedName;
        const role = user.roleID;
        const subAccountID = user.subAccountID;
        const message = "success";
        // create JWTs
        const accessToken = jwt.sign(
          {
            "UserInfo": {
              "id": id,
              "name": name,
              "role": role,
              "subAccountID": subAccountID
            }
          },
          //@ts-ignore
          process.env.TOKEN_SECRET,
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
}

const AuthenticationRouter = (app: express.Application) => {
  app.post('/auth', handleLogin);
};

export default AuthenticationRouter;
