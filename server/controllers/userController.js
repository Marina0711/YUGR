const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Order } = require('../models/index')

const generateJwt = (id, email, role) => jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
)

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password!'))
            }

            const user = await User.findOne({where: {email}})
            if (user) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует!'))
            }

            const hashPassword = await  bcrypt.hash(password, 5)
            const newUser = await User.create({email, role, password: hashPassword})
            await Order.create({userId: newUser.id})
            const token = generateJwt(newUser.id, newUser.email, newUser.role)

            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден!'))
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if (!isPasswordValid) {
                return next(ApiError.internal('Указан неверный пароль!'))
            }

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }

    async refreshToken(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            res.json({token})
        } catch (e) {
            next(ApiError.badRequest((e.message)))
        }
    }
}

module.exports = new UserController()
