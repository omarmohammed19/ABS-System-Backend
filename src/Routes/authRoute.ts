import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { webUsers } from '../Models/webUsers';
import { authController } from '../Controllers/authController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const authcontroller = new authController();

const handleLogin = async (req: Request, res: Response) => {
    const result = await authcontroller.handleLogin(req.body.username, req.body.password);
    if (!result) {
        return res.sendStatus(401); //Unauthorized 
    }
    //@ts-ignore
    if (result.isEnabled === false) {
        return res.sendStatus(403); //Forbidden
    }
    // evaluate password 
    try {
        const match = await bcrypt.compareSync(req.body.password + process.env.PEPPER, result.webUserPassword);
        if (match) {
            const id = result.ID;
            const name = result.userName;
            const role = result.Roles;
            const message = "success";
            // create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": id,
                        "name": name,
                        "role": role
                    }
                },
                //@ts-ignore
                process.env.TOKEN_SECRET,
            );
            // set cookies
            res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
            res.json({ id, name, accessToken, message, });
        } else {
            console.log('Username or password is incorrect');
            return res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); //Unauthorized
    }

}

const handleLoginRouter = (app: express.Application) => {
    app.post('/auth', handleLogin);
}

export default handleLoginRouter;