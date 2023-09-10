const compose = (f, g) => (...args) => f(g(...args))

module.exports = compose