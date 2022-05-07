const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const ratingRouter = require('./ratingRouter')
const ordersRouter = require('./ordersRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/rating', ratingRouter)
router.use('/orders', ordersRouter)

module.exports = router
