const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/', authMiddleware, roleMiddleware('ADMIN'), categoryController.create)
router.delete('/:id', authMiddleware, roleMiddleware('ADMIN'), categoryController.delete)
router.get('/', authMiddleware, categoryController.getAll)

module.exports = router
