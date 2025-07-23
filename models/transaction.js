const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw', 'transfer_in', 'transfer_out'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  target_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  underscored: true,
});

// Relasi ke User
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Transaction.belongsTo(User, { foreignKey: 'target_id', as: 'targetUser' });

module.exports = Transaction;
