// require('dotenv').config();
// const path = require('path');

// module.exports = {
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DIALECT,
//     use_env_variable: '',
//   },
//   test: {
//     username: 'root',
//     password: null,
//     database: 'database_test',
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     use_env_variable: null,
//   },
//   production: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DIALECT,
//     use_env_variable: '',
//   },
// };

import * as dotenv from 'dotenv';
import * as path from 'path';
import { Dialect } from 'sequelize';
import logger from '../utils/logger';

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  use_env_variable: string;
  logging: boolean | ((msg: any) => any);
}

type Config = {
  [key in 'development' | 'test' | 'production']: DBConfig;
};

export const SequelizeConfig: Config = {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: process.env.DIALECT! as Dialect,
    use_env_variable: '',
    logging: (msg: any) => logger.debug(msg),
  },
  test: {
    username: 'root',
    password: null!,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql' as Dialect,
    use_env_variable: null!,
    logging: (msg: any) => logger.debug(msg),
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOST!,
    dialect: process.env.DIALECT! as Dialect,
    use_env_variable: '',
    logging: false,
  },
};
