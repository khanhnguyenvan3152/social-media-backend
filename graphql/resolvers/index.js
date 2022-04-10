const postResolver = require('./posts')
const userResolver = require('./users')

module.exports = [
    postResolver,
    userResolver,
]