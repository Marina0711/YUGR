const Router = require('express')
const router = new Router()
const multer  = require('multer')
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const upload = multer({storage: multer.diskStorage({
        destination: function (req, file, callback) { callback(null, './static/')},
        filename: function (req, file, callback) {callback(null, file.originalname)}})
}).single('img');

router.post('/', authMiddleware, roleMiddleware('ADMIN'), upload, productController.create)
router.get('/', authMiddleware, productController.getAll)
router.get('/:id', authMiddleware, productController.getOne)

module.exports = router
