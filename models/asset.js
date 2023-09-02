const { DataTypes } = require('sequelize')

const sequelize = require('../database')

const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  fileName: DataTypes.STRING,

  fileType: DataTypes.STRING,
})

module.exports = Asset