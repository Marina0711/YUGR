const Product = require('./product')
const Order = require('./order')
const ProductInfo = require('./productInfo')
const Category = require('./category')
const Rating = require('./rating')
const User = require('./user')
const OrderInfo = require('./orderInfo')

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(Rating, {as: 'rateInfo'})
Rating.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderInfo, {as: 'orderInfo'})
OrderInfo.belongsTo(Order)

Product.hasMany(OrderInfo)
OrderInfo.belongsTo(Product)

module.exports = { Product, Order, ProductInfo, Category, Rating, User, OrderInfo }
