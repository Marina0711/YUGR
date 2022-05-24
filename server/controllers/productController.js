const { Product, ProductInfo, Rating } = require('../models/index')
const ApiError = require('../error/apiError')
const calculateRating = require('../helpers/calculateRating')

const postProductInfo = async (title, description, productId) => {
    await ProductInfo.create({
        title,
        description,
        productId
    })
}

const getRateData = (ratings, user) => {
    if (ratings.length) {
        return {
            isRated: ratings.some(item => item.user === +user),
            rate: calculateRating(ratings.map(item=> item.rate))
        }
    } else {
        return {
            isRated: false,
            rate: 0
        }
    }
}

class ProductController {
    async create(req, res, next) {
        try {
            const {name, price, categoryId, info} = req.body
            const img = req.file.originalname

            const product = await Product.create({ name, price, categoryId, img })

            if (info) {
                const infoTest = JSON.parse(info)
                await Promise.all(infoTest.map(async i => {
                    try {
                        await postProductInfo(i.title, i.description, product.id)
                    } catch (e) {
                        next(ApiError.badRequest((e.message)))
                    }
                }))
            }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params

            const deletedProduct = await Product.destroy({ where: { id }})

            return res.json(deletedProduct)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async getAll(req, res, next) {
        try {
            const { categoryId , page = 1, limit = 10 } = req.query
            const offset = page * limit - limit

            const query = categoryId > 0 ? {where: {categoryId}, limit, offset } : { limit, offset };

            const products = await Product.findAndCountAll(query)

            return res.json(products)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const { user } = req.body

            const product = await Product.findOne(
                {
                    where: { id },
                    include: [{ model: ProductInfo, as: 'info' }, { model: Rating, as: 'rateInfo' }]
                }
            )

            if (!product) {
                return next(ApiError.notFound('Нет такой трубы, дружок!)'))
            }

            return res.json({...product.dataValues, rateInfo: getRateData(product.rateInfo, user)})
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new ProductController()
