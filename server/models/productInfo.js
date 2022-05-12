const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const ProductInfo = sequelize.define('productInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

module.exports = ProductInfo
