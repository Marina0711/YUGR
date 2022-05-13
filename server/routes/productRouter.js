const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/', checkRole('ADMIN'), productController.create)
router.get('/', authMiddleware, productController.getAll)
router.get('/:id', authMiddleware, productController.getOne)

module.exports = router
