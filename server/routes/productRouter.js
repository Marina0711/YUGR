const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, productController.create)
router.get('/', authMiddleware, productController.getAll)
router.get('/:id', authMiddleware, productController.getOne)

module.exports = router
