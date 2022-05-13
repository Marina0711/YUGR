const uuid = require('uuid')
const path = require('path')
const Product = require('../models/product')
const ProductInfo = require('../models/productInfo')
const Rating = require('../models/rating')
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
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const product = await Product.create({ name, price, categoryId, img: fileName })

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

    async getAll(req, res, next) {
        try {
            const { categoryId, limit = 10 , page = 1 } = req.body
            const offset = page * limit - limit

            const query = categoryId ? {where: {categoryId}, limit, offset } : { limit, offset };

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
