const { Order, OrderInfo } = require('../models/index')
const ApiError = require('../error/apiError');
const getProducts = require('../helpers/getProducts')

class BasketController {
    async add(req, res, next) {
        try {
            const { orderId, productId, count = 1 } = req.body
            if (!orderId || !productId) {
                next(ApiError.badRequest(('Неверные параметры')))
            }

            const addedProduct = await OrderInfo.create({ orderId, productId, count })

            return res.json(addedProduct)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async delete(req, res, next) {
        try {
            const { productId, orderId } = req.query
            if (!orderId || !productId) {
                next(ApiError.badRequest(('Неверные параметры')))
            }

            const deletedProduct = await OrderInfo.destroy({ where: { productId, orderId } })

            return res.json(deletedProduct)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async updateCounter(req, res, next) {
        try {
            const { orderId, productId, count } = req.body

            await OrderInfo.update(
                { count },
                { where: { orderId, productId } }
            )

            const updatedProduct = await OrderInfo.findOne({ where: { orderId, productId } })

            return res.json(updatedProduct)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async get(req, res, next) {
        try {
            const { userId } = req.query

            const basket = await Order.findOne(
                {
                    where: { userId, status: false },
                    include: [{ model: OrderInfo, as: 'orderInfo' }]
                }
            )

            const { products, total } = await getProducts(basket.dataValues.orderInfo, next)

            return res.json({id: basket.dataValues.id, products, total})
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new BasketController()
