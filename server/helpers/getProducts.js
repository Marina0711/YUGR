const {Product} = require("../models");
const ApiError = require("../error/apiError");

module.exports = async function (orderInfo, next) {
    const products = [];
    let total = 0

    await Promise.all(orderInfo.map(async i => {
        try {
            const product = await Product.findOne({ where: { id: i.productId }})
            products.push({...product.dataValues, count: i.count})
            total += i.count * product.price
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }))

    return { products, total }
}
