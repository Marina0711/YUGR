module.exports = function (ratings) {
    if (!ratings.length) {
        return 0
    }

    const rating = ratings.reduce((total, rate) => {
        return total + rate
    }, 0)
    return rating / ratings.length
}
