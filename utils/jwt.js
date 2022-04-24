const jwt = require('jsonwebtoken')
const { tokenSecret, tokenExpiry } = require('../config')

const genToken = (payload) => {
    const token = jwt.sign(payload, tokenSecret, { expiresIn: tokenExpiry })
    return token;
}

const verifyToken = (token) => {
    const payload = jwt.verify(token, tokenSecret)
    return payload;
}
module.exports = {genToken,verifyToken}