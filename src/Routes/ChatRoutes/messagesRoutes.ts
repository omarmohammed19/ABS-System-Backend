import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import { MessageController } from '../../Controllers/ChatControllers/messageController';
import { messages } from '../../Models/messagesModel';

dotenv.config();

const messageController = new MessageController();

const addMessage = async (req: Request, res: Response) => {

    try {
        const message: messages = {
            ConversationID: req.body.ConversationID,
            SenderID: req.body.SenderID,
            Text: req.body.Text
        }
        const result = await messageController.create(message);
        res.json(result);
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

// const getMessages = async (req: Request, res: Response) => {
//     try {
//         const result = await messageController.index();
//         res.json(result);
//     } catch (error) {
//         res.status(400)
//         res.json(error)
//     }
// }

// const getMessageByID = async (req: Request, res: Response) => {

//     try {
//         const result = await messageController.getMessageByID(req.params.id);
//         res.json(result);
//     } catch (error) {
//         res.status(400)
//         res.json(error)
//     }
// }

const messageRouter = (app: express.Application) => {
    app.post('/message', addMessage);
    // app.get('/message', getMessages);
    // app.get('/message/:id', getMessageByID);
}

export default messageRouter;