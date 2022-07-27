import dotenv from 'dotenv';

dotenv.config();

const {
    SQL_HOST,
    SQL_DB,
    SQL_USER,
    SQL_PASSWORD
} = process.env;

// const sqlConfig: {
//     user: string | undefined,
//     password: string | undefined,
//     database: string | undefined,
//     server: string | undefined,
//     driver: string | undefined
// } = {
//     user: SQL_USER,
//     password: SQL_PASSWORD,
//     server: SQL_HOST,
//     database: SQL_DB,
//     driver: 'msnodesqlv8'
// };

// export const sqlConfig = {
//     user: 'sa',
//     password: 'AdminSQL@@##2020',
//     database: 'ABS_Fleet',
//     server: '172.16.16.198',
//     driver: 'msnodesqlv8',
// }

// export default sqlConfig;


