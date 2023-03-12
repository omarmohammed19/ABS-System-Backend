import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const { SQL_HOST, SQL_DB, SQL_USER, SQL_PASSWORD, SQL_DIALECT } = process.env;

export const sqlConfig = {
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: SQL_DB,
  server: SQL_HOST,
  dialect: SQL_DIALECT,
  driver: 'msnodesqlv8',
};

//@ts-ignore
export const sequelize = new Sequelize(SQL_DB, SQL_USER, SQL_PASSWORD, {
  host: SQL_HOST,
  dialect: SQL_DIALECT,

});
