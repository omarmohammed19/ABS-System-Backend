import dotenv from "dotenv";

dotenv.config();

export interface Conversation {
    ID?: BigInt,
    MemberID1: BigInt,
    MemberID2: BigInt,
}