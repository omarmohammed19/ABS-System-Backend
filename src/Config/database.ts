import dotenv from 'dotenv';

dotenv.config();

const {
    SQL_HOST,
    SQL_DB,
    SQL_USER,
    SQL_PASSWORD
} = process.env;

export const sqlConfig = {
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DB,
    server: SQL_HOST,
    driver: 'msnodesqlv8',
}


export default sqlConfig;


