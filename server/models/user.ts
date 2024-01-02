'use strict';

import * as Sequelize from 'sequelize';
import { UserAttributes } from '../interface/models';
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Sequelize.Model<UserAttributes> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    },
  );
  return User;
};
