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

  content: DataTypes.STRING

})

module.exports = Message