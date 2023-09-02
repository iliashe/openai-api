const { DataTypes } = require('sequelize')

const sequelize = require('../database')

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  type: {
    type: DataTypes.STRING,
  },

  createdAt: {
    type: DataTypes.DATE,
  }
})

module.exports = Message