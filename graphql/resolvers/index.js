const postResolver = require('./posts')
const userResolver = require('./users')
const fileResolver = require('./files')
const likeResolver = require('./likes')
const notificationResolver = require('./notifications')
const {JWTResolver} = require('graphql-scalars')
module.exports = [
    postResolver,
    userResolver,
    likeResolver,
    notificationResolver
]