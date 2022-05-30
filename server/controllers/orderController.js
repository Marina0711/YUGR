const { Order, OrderInfo } = require('../models/index')
const ApiError = require('../error/apiError');
const getProducts = require('../helpers/getProducts')

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
            const { userId } = req.query

            const orders = await Order.findAll(
                {
                    where: { userId, status: true },
                    include: [{ model: OrderInfo, as: 'orderInfo' }]
                }
            )

            const result = await Promise.all(orders.map(async (order) => {
                const { products, total } = await getProducts(order.dataValues.orderInfo, next)

                return {
                    id: order.id,
                    date: order.updatedAt,
                    products,
                    total
                }

            }))

            return res.json(result)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new OrderController()
