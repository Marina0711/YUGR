const uuid = require('uuid')
const path = require('path')
const Product = require('../models/product')
const ProductInfo = require('../models/productInfo')
const Rating = require('../models/rating')
const ApiError = require('../error/ApiError')

const postProductInfo = async (title, description, productId) => {
    await ProductInfo.create({
        title,
        description,
        productId
    })
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
            let { categoryId, limit = 10 , page = 1 } = req.body
            let offset = page * limit - limit
            let products

            const query = categoryId ? {where: {categoryId}, limit, offset } : { limit, offset };

            products = await Product.findAndCountAll(query)

            return res.json(products)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    //todo come up with a good way to display the rating
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

            const calculateRating = (ratings) => {
                let rating = 0
                if (ratings) {
                    ratings.forEach(i => {
                        rating += i
                    })
                    rating = rating / ratings.length
                }

                return rating
            }

            const parsedProduct = JSON.parse(JSON.stringify(product))
            const newProduct = {...parsedProduct}

            if (!parsedProduct) {
                return next(ApiError.notFound('Нет такой трубы, дружок!)'))
            }

            if (parsedProduct.rateInfo.length){
                newProduct.rateInfo = {
                    isRated: parsedProduct.rateInfo.reduce((total, item) => {
                        if (item.user === Number(user)){
                            total = true
                        }
                        return total
                    }, false),
                    rate: calculateRating(product.rateInfo.map(item=> item.rate))
                }
            } else {
                newProduct.rateInfo = {
                    isRated: false,
                    rate: 0
                }
            }

            return res.json(newProduct)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new ProductController()
