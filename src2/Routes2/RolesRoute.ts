import express, { Request, Response } from 'express'
import { Roles } from '../Models2/Roles';
import { RolesController } from '../Controllers2/RolesController';


const roles = new RolesController();


async function getClientRoles(req: Request, res: Response) {
    try {
        const role = await roles.getClientRoles();
        res.status(200).json(role);
    } catch (error) {
        res.status(400).json("Could not get roles");
    }
}

const rolesRoutes = (app: express.Application) => {
    app.get('/clientRoles', getClientRoles);
}

export default rolesRoutes;




