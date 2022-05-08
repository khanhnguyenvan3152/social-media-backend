const { AuthenticationError } = require('apollo-server-core')
const { verifyToken } = require('../../utils/jwt')

module.exports = ({ req,connection }) => {
    const token = req.headers.authorization || ''
    if(token == ''){
        throw new AuthenticationError("Unauthorized",{code:403})
    }
    const user = verifyToken(token)
    
    return {user}
}