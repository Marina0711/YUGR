const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING}
})

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

// const Basket = sequelize.define('basket', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

// const BasketProduct = sequelize.define('basketProduct', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// })

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: {type: DataTypes.INTEGER, allowNull: false},
    user: {type: DataTypes.INTEGER, allowNull: false}
})

const ProductInfo = sequelize.define('productInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

// User.hasOne(Basket)
// Basket.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User)

// User.hasMany(Rating)
// Rating.belongsTo(User)

// Basket.hasMany(BasketProduct)
// BasketProduct.belongsTo(Basket)

Product.hasMany(Orders)
Orders.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(Rating)
Rating.belongsTo(Product)

// Product.hasMany(BasketProduct)
// BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

module.exports = {
    User,
    Orders,
    // BasketProduct,
    Product,
    Category,
    Rating,
    ProductInfo
}
