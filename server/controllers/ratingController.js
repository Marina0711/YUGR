const { Rating } = require('../models/index')
const ApiError = require('../error/apiError');
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

            const ratings = await Rating.findAll({ where: { productId } })

            const rating = calculateRating(ratings.map(item=> item.rate))
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new RatingController()
