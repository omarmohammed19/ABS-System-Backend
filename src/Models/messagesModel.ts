import dotenv from "dotenv";

dotenv.config();

export interface messages {
    MessageID?: number,
    ConversationID: number
    SenderID: number,
    Text: string
}