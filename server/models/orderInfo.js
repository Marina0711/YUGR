const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const OrderInfo = sequelize.define('orderInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1},
})

module.exports = OrderInfo
