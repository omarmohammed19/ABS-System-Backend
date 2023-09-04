import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    //@ts-ignore
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    //@ts-ignore
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        //@ts-ignore
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            //@ts-ignore
            req.userID = decoded.UserInfo.id;
            //@ts-ignore
            req.name = decoded.UserInfo.name;
            //@ts-ignore
            req.subAccountID = decoded.UserInfo.subAccountID;
            //@ts-ignore
            req.mainAccountID = decoded.UserInfo.mainAccountID;
            //@ts-ignore
            req.departmentID = decoded.UserInfo.departmentID;
            //@ts-ignore
            req.branchID = decoded.UserInfo.branchID;
            //@ts-ignore
            req.roleTypeID = decoded.UserInfo.roleTypeID;
            next();
        }
    );
}

export default verifyJWT;