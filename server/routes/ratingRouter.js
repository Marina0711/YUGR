const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, ratingController.create)
router.get('/:productId', authMiddleware, ratingController.getAll)

module.exports = router
