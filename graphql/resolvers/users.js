const { UserInputError, ApolloError, AuthenticationError } = require('apollo-server-core')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const genPassword = require('../../utils/genPassword')
const jwt = require('jsonwebtoken')
const { JWTResolver } = require('graphql-scalars')
const { tokenSecret, frontendURL } = require('../../config')
const Post = require('../../models/Post')
const { sendMail } = require('../../utils/mailer')
const RESET_PASSWORD_EXPIRY = 3600000
const AUTH_TOKEN_EXPIRY = '1y'
const resolvers = {
    JWT: JWTResolver,
    Query: {
        users: async function () {
            let result = await User.find().populate('follows')
            return result
        },
        getUserById: async function (parent, args, context, info) {
            let result = await User.findById(args._id)
            return result;
        },
        getUserByEmail: async function (parent, args, context, info) {
            let result = await User.findOne({ email: { $regex: new Regex(/args.email/) } })
            return result
        },
        getUserFollowers: async function (parent, args, context, info) {
            let result = await User.findById(args._id).select('followers').populate('user')
            return result;
        },
        getUserFollow: async function (parent, args, content, info) {
            let result = await User.findById(args._id).select('follows').populate('user')
            return result;
        },
        userLikePost: async function (parent, args, content, info) {
            let { userId, postId } = args;
            let result = await Post.findById(postId).select('liked')
            return result.includes(userId)
        },
        login: async function (parent, args, context, info) {
            let { email, password } = args
            let isUserExist = await User.exists({ email: email })
            if (!isUserExist) {
                throw new UserInputError('user does not exist.')
            }
            else {
                let user = await User.findOne({ email: email }).select({ password: 1, email: 1, _id: 1 })
                let isMatch = await bcrypt.compare(password, user.password)
                if (isMatch) {
                    let token = jwt.sign({ email: user.email, _id: user._id }, tokenSecret, { expiresIn: AUTH_TOKEN_EXPIRY })
                    return { success: true, token }
                } else {
                    throw new UserInputError('Email or password does not match')
                }
            }
        }
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
                if (!firstName || !lastName || !email || !username || !password || !gender || !phoneNumber) {
                    throw new UserInputError('All fields are required.');
                }
                const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
                if (!emailRegex.test(email.toLowerCase())) {
                    throw new UserInputError("Email's fomart is invalid.")
                }
                if (firstName.length < 1) {
                    throw new UserInputError("Firstname length must be atleast 1 character")
                }
                if (fullName.length < 1) {
                    throw new UserInputError("Fullname length must be atleast 1 character.")
                }
                if (password.length < 3) {
                    throw new UserInputError("Password length must be atleast 3 character")
                }
                let user = new User();
                user.email = email;
                user.password = await genPassword(password);
                user.phoneNumber = phoneNumber;
                user.gender = gender;
                user.firstName = firstName;
                user.lastName = lastName;
                await user.save();
                //Return success message
                // const token = jwt.sign({_id:user._id,fullName:lastName + firstName},tokenSecret,{expiresIn:TKEN})
                return { success: true, message: 'Signup successfully' };
            }
            catch (err) {
                console.log(err.errors)
                //Throw error for apollo server message response
                throw new UserInputError(Object.values(err.errors)[0])
            }
        },
        requestResetPassword: async function (parent, args, context, info) {
            //Check if user is exist
            const user = await User.findOne({ email });
            if (!user) {
                throw new UserInputError('Account does not exist')
            }
            //Set password token and its expiry
            const token = jwt.sign(user, tokenSecret, { expiresIn: RESET_PASSWORD_EXPIRY })
            const resetPasswordLink = `${frontendURL}/reset-password?email=${email}&token=${token}`
            user.resetToken = token;
            user.resetTokenExpiry = Date.now() + RESET_PASSWORD_EXPIRY
            await user.save()
            const mailOption = {
                address: email,
                subject: `Reset password request for ${email}`,
                html: `Please access the link bellow to reset your password <br> <a target="_blank" href="${resetPasswordLink}>${resetPasswordLink}</a>`
            }
            try {
                await sendMail(mailOption)
                return {
                    success: true,
                    message: "Please check your email for reset password link"
                }
            }catch(err){
                throw new Error('An error occured')
            }
        },
        resetPassword: async function(parent,args,context,info){
            if(!context.user){
                throw new AuthenticationError('You do not have permission to view this content')
            }
        },
    
    }
}

module.exports = resolvers 