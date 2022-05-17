const { Order, OrderInfo } = require('../models/index')
const ApiError = require('../error/apiError');

class OrderController {
    async create(req, res, next) {
        try {
            const { orderId, userId } = req.body
            const updatedOrder = await Order.update(
                { status: true },
                { where: { id: orderId } }
            )

            await Order.create({ userId })

            return res.json(updatedOrder)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.body

            const basket = await Order.findAll(
                {
                    where: { userId, status: true },
                    include: [{ model: OrderInfo, as: 'orderInfo' }]
                }
            )

            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new OrderController()
