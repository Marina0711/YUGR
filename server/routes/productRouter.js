const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/', authMiddleware, roleMiddleware('ADMIN'), productController.create)
router.get('/', authMiddleware, productController.getAll)
router.get('/:id', authMiddleware, productController.getOne)

module.exports = router
