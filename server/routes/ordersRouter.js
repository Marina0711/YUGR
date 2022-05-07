const Router = require('express')
const router = new Router()
const ordersController = require('../controllers/ordersController')

router.post('/createOrder', ordersController.createOrder)
router.post('/addProduct', ordersController.addProduct)
router.get('/basket', ordersController.getBasket)
router.get('/', ordersController.getOrders)

module.exports = router
