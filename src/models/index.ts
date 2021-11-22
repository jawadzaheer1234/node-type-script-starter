'use strict';

import { Sequelize } from 'sequelize';
const env = 'development';
import configFile from '~/config';
const config = configFile[env];

//Requiring and importing models.
import user from './user';


const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = { User: user(sequelize) };
Object.values(models).forEach(model=> {
  if (model.associate) model.associate();
})
export {models, sequelize, Sequelize };
