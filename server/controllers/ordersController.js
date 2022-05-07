const { Orders } = require('../models/models')
const ApiError = require('../error/ApiError');

class OrdersController {
    async createOrder(req, res, next) {
        const { user } = req.body
        const order = await Orders.update()

        return res.json(rating)
    }

    async getAll(req, res) {
        const { productId } = req.params

        const ratings = await Rating.findAll({where: {productId}})

        let rating = calculateRating(ratings)
        return res.json(rating)
    }
}

module.exports = new OrdersController()
