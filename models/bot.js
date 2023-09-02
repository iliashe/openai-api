const { DataTypes } = require('sequelize')

const sequelize = require('../database')

// openAI models
const Bot = sequelize.define('Bot', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    unique: true,
  }
})

module.exports = Bot