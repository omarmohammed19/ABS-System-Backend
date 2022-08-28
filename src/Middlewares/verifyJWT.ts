import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken';
require('dotenv').config();

const verifyJWT = (req:Request, res:Response, next:NextFunction) => {
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
            req.userName = decoded.UserInfo.name;
            next();
        }
    );
}

export default verifyJWT;