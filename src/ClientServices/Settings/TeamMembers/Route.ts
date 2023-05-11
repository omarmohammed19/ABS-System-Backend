import express, { Request, Response } from 'express';
import { TeamMembersController } from './Controller';


const teamMembersController = new TeamMembersController();


const getTeamMembers = async (req: Request, res: Response) => {
  try {
    const language = req.headers['accept-language'] === 'ar' ? 'ar' : 'en';
    //@ts-ignore
    const mainAccountID = req.mainAccountID;
    //@ts-ignore
    const userID = req.userID
    const result = await teamMembersController.getTeamMembers(language, mainAccountID, userID);
    res.status(200).send(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};


const TeamMembersRouter = (app: express.Application) => {
  app.get('/team-members', getTeamMembers);
};
export default TeamMembersRouter;
