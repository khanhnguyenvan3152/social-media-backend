const postResolver = require('./posts')
const userResolver = require('./users')
const fileResolver = require('./files')
module.exports = [
    postResolver,
    userResolver,
    fileResolver
]