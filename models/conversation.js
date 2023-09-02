const { DataTypes } = require('sequelize')

const sequelize = require('../database')

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  title: {
    type: DataTypes.STRING,
    defaultValue: 'New Chat'
  },
})

module.exports = Conversation