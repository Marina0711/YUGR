const jws = require('jsonwebtoken')
const ApiError = require("../error/ApiError");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return next(ApiError.unauthorized(('Не авторизован')))
            }
            const decoded = jws.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return next(ApiError.unauthorized(('Нет доступа')))
            }
            req.user = decoded
            next()
        } catch (e) {
            next(ApiError.unauthorized(('Не авторизован')))
        }
    }
}

