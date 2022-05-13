const ApiError = require("../error/ApiError");

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {
            if (req.user.role !== role) {
                return next(ApiError.unauthorized(('Нет доступа')))
            }
            next()
        } catch (e) {
            next(ApiError.unauthorized(('Не авторизован')))
        }
    }
}

