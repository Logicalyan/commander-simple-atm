const sequelize = require('../config/db');
const User = require('./user');
const Transaction = require('./transaction');

module.exports = {
  sequelize,
  User,
  Transaction
};
