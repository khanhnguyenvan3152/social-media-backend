const { UserInputError, ApolloError, AuthenticationError } = require('apollo-server-core')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const genPassword = require('../../utils/genPassword')
const jwt = require('jsonwebtoken')
const { JWTResolver } = require('graphql-scalars')
const { tokenSecret, frontendURL } = require('../../config')
const Post = require('../../models/Post')
const { sendMail } = require('../../utils/mailer')
const config = require('../../config')
const RESET_PASSWORD_EXPIRY = 3600000
const AUTH_TOKEN_EXPIRY = '1y'
const resolvers = {
    Query: {
        getAuthUser: async function (parent, args, context, info) {
            const { authUser } = context
            if (!authUser) return null;
            const user = await User.findOneAndUpdate({ email: authUser.email }, { isOnline: true })
            .populate({ path: 'posts',options:{sort:{createdAt:'desc'}} })
            .populate('followers')
            .populate('follows')
            .populate({
                path: 'notifications',
                populate: [
                    { path: 'author' },
                    { path: 'follow' },
                    { path: 'like', populate: { path: 'post' } },
                    { path: 'comment', populate: { path: 'post' } },
                ],
                match: { seen: false },
            });
            user.newNotifications = user.newNotifications
            console.log(user)
            return user;
        },
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
                if (!firstName || !lastName || !email || !password || !gender || !phoneNumber) {
                    throw new UserInputError('All fields are required.');
                }
                const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
                if (!emailRegex.test(email.toLowerCase())) {
                    throw new UserInputError("Email's fomart is invalid.")
                }
                if (firstName.length < 1) {
                    throw new UserInputError("Firstname length must be atleast 1 character")
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
                return { user: user, success: true, message: 'Signup successfully' };
            }
            catch (err) {
                console.log(err)
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
            } catch (err) {
                throw new Error('An error occured')
            }
        },
        resetPassword: async function (parent, args, context, info) {
            const {email,token,password} = args.input
            if(!password){
                throw new Error('Enter password or confirm password.');
            }
            if(password.length<6){
                throw new Error('Password must be at least 6 characters long.')
            }
            //Check if user is exist and token is valid
            const user = await User.findOne({
                email: email,
                resetPasswordToken:token,
                resetPasswordTokenExpiry: {
                    $gte: Date.now() - RESET_PASSWORD_EXPIRY
                }
            })
            if(!user){
                throw new Error('This token is either invalid or expired!')
            }
            //Update password, reset token and its expiry
            user.resetPasswordToken = '',
            user.resetPasswordTokenExpiry = '';
            user.password = password;
            await user.save()
            return {
                token: generateToken(user,config.tokenSecret,config.tokenExpiry)
            }
        },
        login: async function (parent, args, context, info) {
            let { email, password } = args.input
            const { res } = context;
            let isUserExist = await User.exists({ email: email })
            if (!isUserExist) {
                throw new UserInputError('user does not exist.')
            }
            else {
                let user = await User.findOne({ email: email }).select({ password: 1, email: 1, _id: 1 })
                let isMatch = await bcrypt.compare(password, user.password)
                if (isMatch) {
                    let token = jwt.sign({ email: user.email, _id: user._id }, tokenSecret, { expiresIn: AUTH_TOKEN_EXPIRY })
                    res.cookie('token', token, { samesite: "none" })
                    return { success: true, token }
                } else {
                    throw new UserInputError('Email or password does not match')
                }
            }
        }
    }
}

module.exports = resolvers 