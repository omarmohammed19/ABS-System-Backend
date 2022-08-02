import dotenv from "dotenv";

dotenv.config();

export interface Branch {
    branchID?: number,
    branchName: string,
}