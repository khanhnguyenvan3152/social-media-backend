const { UserInputError, ApolloError } = require('apollo-server-core')
const { argsToArgsConfig } = require('graphql/type/definition')
const User = require('../../models/User')
const genPassword = require('../../utils/genPassword')
const resolvers = {
    Query: {
        users: async function () {
            let result = await User.find().populate('follows')
            return result
        },
        user: async function (parent, args, context, info) {
            let result = await User.findById(args._id)
            return result;
        },
        // userByEmail: async function (parent,args,context,info){
        //     let result = await User.findOne({email: {$regex:new Regex(/args.email/)}})
        // }
    },
    Mutation: {
        createNewUser: async (parent, args, context, info) => {
            console.log(args)
            let { email, password, phoneNumber, gender, firstName, lastName } = args.input;
            try {
                let checkEmailExist = await User.exists({ email: email })
                if (checkEmailExist) {
                    throw new UserInputError('Email is already used')
                }
                else {
                    let user = new User();
                    user.email = email;
                    user.password = await genPassword(password);
                    user.phoneNumber = phoneNumber;
                    user.gender = gender;
                    user.firstName = firstName;
                    user.lastName = lastName;
                    await user.save();
                    return user;
                }
            }
            catch (err) {
                console.log(err.errors)
                //Throw error for apollo server message response
                throw new UserInputError(Object.values(err.errors)[0])
            }
        }
    }
}

module.exports = resolvers 