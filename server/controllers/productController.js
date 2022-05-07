const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo, Rating } = require('../models/models')
const ApiError = require('../error/ApiError')

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
                infoTest.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }


            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }

    }
    async getAll(req, res) {
        let { categoryId, limit = 10 , page = 1 } = req.body
        let offset = page * limit - limit
        let products

        if (categoryId) {
            products = await Product.findAndCountAll({ where: {categoryId}, limit, offset })
        } else {
            products = await Product.findAndCountAll({ limit, offset })
        }

        return res.json(products)

    }

    async getOne(req, res) {
        const {id} = req.params

        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            }
        )

        return res.json(product)
    }
}

module.exports = new ProductController()
