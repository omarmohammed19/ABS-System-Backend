import dotenv from 'dotenv';

dotenv.config();

const {
    SQL_HOST,
    SQL_DB,
    SQL_USER,
    SQL_PASSWORD
} = process.env;

export const sqlConfig = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    server: process.env.SQL_HOST,
    driver: 'msnodesqlv8',
}

export default sqlConfig;


