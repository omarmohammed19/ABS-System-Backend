import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { webUsers } from '../Models2/webUsers';
import { authController } from '../Controllers2/authController';
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
        const match = await bcrypt.compareSync(req.body.password + process.env.pepper, result.webUserPassword ? result.webUserPassword : "");
        if (match) {
            const id = result.ID;
            const name = result.userName;
            const role = result.Roles;
            const subAccountID = result.subAccountID;
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

// const handleLoginByEmail = async (req: Request, res: Response) => {
//     const result = await authcontroller.handleLoginByEmail(req.body.email, req.body.password);
//     if (!result) {
//         return res.sendStatus(401); //Unauthorized 
//     }
//     //@ts-ignore
//     if (result.isEnabled === false) {
//         return res.sendStatus(403); //Forbidden
//     }
//     // evaluate password 
//     try {
//         const match = await bcrypt.compareSync(req.body.password + process.env.pepper, result.webUserPassword ? result.webUserPassword : "");
//         if (match) {
//             const id = result.ID;
//             const name = result.userName;
//             const role = result.Roles;
//             const subAccountID = result.subAccountID;
//             const message = "success";
//             // create JWTs
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "id": id,
//                         "name": name,
//                         "role": role,
//                         "subAccountID": subAccountID
//                     }
//                 },
//                 //@ts-ignore
//                 process.env.TOKEN_SECRET,
//             );
//             // set cookies
//             res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
//             res.json({ id, name, accessToken, message, });
//         } else {
//             console.log('email or password is incorrect');
//             return res.sendStatus(401);
//         }
//     } catch (err) {
//         console.log(err);
//         return res.sendStatus(400); //Unauthorized
//     }
// }

// const handleLoginByMobile = async (req: Request, res: Response) => {
//     const result = await authcontroller.handleLoginByMobile(req.body.mobile, req.body.password);
//     if (!result) {
//         return res.sendStatus(401); //Unauthorized 
//     }
//     //@ts-ignore
//     if (result.isEnabled === false) {
//         return res.sendStatus(403); //Forbidden
//     }
//     // evaluate password 
//     try {
//         const match = await bcrypt.compareSync(req.body.password + process.env.pepper, result.webUserPassword ? result.webUserPassword : "");
//         if (match) {
//             const id = result.ID;
//             const name = result.userName;
//             const role = result.Roles;
//             const subAccountID = result.subAccountID;
//             const message = "success";
//             // create JWTs
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "id": id,
//                         "name": name,
//                         "role": role,
//                         "subAccountID": subAccountID
//                     }
//                 },
//                 //@ts-ignore
//                 process.env.TOKEN_SECRET,
//             );
//             // set cookies
//             res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
//             res.json({ id, name, accessToken, message, });
//         } else {
//             console.log('mobile or password is incorrect');
//             return res.sendStatus(401);
//         }
//     } catch (err) {
//         console.log(err);
//         return res.sendStatus(400); //Unauthorized
//     }
// }

const handlesignin = async (req: Request, res: Response) => {
    const result = await authcontroller.handlesignin(req.body.userCred, req.body.password);
    if (!result) {
        return res.sendStatus(401); //Unauthorized 
    }
    //@ts-ignore
    if (result.isEnabled === false) {
        return res.sendStatus(403); //Forbidden
    }
    // evaluate password 
    try {
        const match = await bcrypt.compareSync(req.body.password + process.env.pepper, result.webUserPassword ? result.webUserPassword : "");
        if (match) {
            const id = result.ID;
            const name = result.userName;
            const role = result.Roles;
            const subAccountID = result.subAccountID;
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
            res.json({ id, name, accessToken, message, });
        } else {
            console.log('mobile or password is incorrect');
            return res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(400); //Unauthorized
    }
}

const getUserInfo = async (req: Request, res: Response) => {
    const result = await authcontroller.getUserInfo(Number(req.params.subAccountID));
    try {
        if (result) {
            res.status(200).json(result);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        return res.sendStatus(400);
    }
}

const handleLoginRouter = (app: express.Application) => {
    app.post('/auth', handleLogin);
    // app.post('/authByEmail', handleLoginByEmail);
    // app.post('/authByMobile', handleLoginByMobile);
    app.post('/signin', handlesignin);
    app.get('/auth/:subAccountID', getUserInfo);
}

export default handleLoginRouter;