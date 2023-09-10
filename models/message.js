const { DataTypes } = require('sequelize')

const sequelize = require('../database')

const Message = sequelize.define('message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  type: {
    type: DataTypes.STRING,
  },

  content: DataTypes.STRING,

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [ [ "user", "assistant", "system" ] ]
    }
  }

})

module.exports = Message