import { ConversationsController } from './../../Controllers/ChatControllers/conversationsController';
import { Conversation } from './../../Models/ConversationModel';
import express, { Request, Response } from 'express'
import dotenv from 'dotenv';

dotenv.config();

const conversationsController = new ConversationsController();

const addConversation = async (req: Request, res: Response) => {

    try {
        const conversation: Conversation = {
            MemberID: req.body.MemberID,
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
}

export default conversationRouter;
