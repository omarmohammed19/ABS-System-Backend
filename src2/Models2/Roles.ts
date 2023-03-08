import dotenv from 'dotenv';


dotenv.config();


export interface Roles {
    ID?: number,
    Role: string,
    roleType: number
}