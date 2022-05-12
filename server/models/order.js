const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

module.exports = Order
