const postResolver = require('./posts')
const userResolver = require('./users')
const fileResolver = require('./files')
const {JWTResolver} = require('graphql-scalars')
module.exports = [
    postResolver,
    userResolver,
    fileResolver,
]