import dotenv from "dotenv";

dotenv.config();

export interface messages {
    MessageID?: number,
    conversationID: number
    senderID: string,
    Text: string
}