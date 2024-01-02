'use strict';

import fs from 'fs';
import path from 'path';
import * as Sequelize from 'sequelize';
import { SequelizeConfig } from '../config/database';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV! || 'development';
const config = (SequelizeConfig as Record<string, any>)[env];

const db: { [key: string]: any } = {};

let sequelize: any;

sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.js') === -1) ||
      (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
