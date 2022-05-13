const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/ordersController')
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/', authMiddleware, ordersController.create)
router.get('/', authMiddleware, ordersController.getAll)

module.exports = router
