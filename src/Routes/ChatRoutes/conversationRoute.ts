import { ConversationsController } from './../../Controllers2/ChatControllers/conversationsController';
import { Conversation } from '../../Models2/ConversationModel';
import express, { Request, Response } from 'express'
import dotenv from 'dotenv';

dotenv.config();

const conversationsController = new ConversationsController();

const getConversationByID = async (req: Request, res: Response) => {

    try {

        const result = await conversationsController.getConversationByID(Number(req.params.id));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const getConversationFriendByID = async (req: Request, res: Response) => {

    try {
        const result = await conversationsController.getConversationFriendByID(Number(req.params.id), Number(req.params.convoId));
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}


const addConversation = async (req: Request, res: Response) => {

    try {
        const conversation: Conversation = {
            MemberID1: req.body.MemberID1,
            MemberID2: req.body.MemberID2,
        }
        const result = await conversationsController.create(conversation);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const conversationRouter = (app: express.Application) => {
    app.post('/conversation', addConversation);
    app.get('/conversation/:id', getConversationByID);
    app.get('/conversation/friend/:id/:convoId', getConversationFriendByID);
}

export default conversationRouter;
