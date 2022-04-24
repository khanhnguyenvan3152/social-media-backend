const { verifyToken } = require('../../utils/jwt')

module.exports = ({ req }) => {
    const token = req.headers.authorization || ''
    const user = verifyToken(token)
    return {user}
}