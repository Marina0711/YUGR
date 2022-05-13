const Rating = require('../models/rating')
const ApiError = require('../error/ApiError');
const calculateRating = require('../helpers/calculateRating')

class RatingController {
    async create(req, res, next) {
        try {
            const { rate, user, productId } = req.body
            const ratedProduct = await Rating.findOne({ where: { productId, user } })
            if (ratedProduct) {
                return next(ApiError.badRequest('Пользователь уже поставил оценку этому товару!'))
            }

            await Rating.create({ rate, user, productId })

            const ratings = await Rating.findAll({where: {productId}})

            const rating = calculateRating(ratings)
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async getAll(req, res, next) {
        try {
            const { productId } = req.params

            const ratings = await Rating.findAll({where: {productId}})

            const rating = calculateRating(ratings)
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new RatingController()
