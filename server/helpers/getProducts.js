const {Product} = require("../models");
const ApiError = require("../error/apiError");

module.exports = async function (orderInfo, next) {
    const products = [];
    let total = 0

    await Promise.all(orderInfo.map(async order => {
        try {
            const product = await Product.findOne({ where: { id: order.productId }})
            products.push({...product.dataValues, count: order.count})
            total += order.count * product.price
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }))

    return { products, total }
}
