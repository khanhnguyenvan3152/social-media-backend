const User = require('../../models/User')
const resolvers = {
    Query:{
        users: async function(){
            let result =await User.find().populate('follows')
            return result
        },
        user: async function(parent, args, context, info){
            let result = await User.findById(args._id)
            return result;
        }
    }
}

module.exports = {resolvers}