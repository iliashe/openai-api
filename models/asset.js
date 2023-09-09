const { DataTypes } = require('sequelize')

const sequelize = require('../database')

const Asset = sequelize.define('asset', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  fileName: DataTypes.STRING,

  fileType: DataTypes.STRING,
})

module.exports = Asset