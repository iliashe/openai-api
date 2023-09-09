const { DataTypes } = require('sequelize')

const sequelize = require('../database')

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastActive: {
    type: DataTypes.DATE,
  },
})

module.exports = User