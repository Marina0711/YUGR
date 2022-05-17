const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')

router.get('/', orderController.getAll)
router.patch('/', orderController.create)

module.exports = router
