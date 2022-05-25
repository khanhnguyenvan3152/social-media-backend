const { ApolloError } = require('apollo-server-core')
const Follow = require('../../models/Follow')
const User = require('../../models/User')
const resolver = {
    Query: {

    },
    Mutation: {
        followUser: async function (parent, args, context, info) {
            try {
                let currentUserId = context.authUser._id
                let followedUserId = args.userId
                let currentUser = await User.findById(currentUserId)
                if (currentUser.follows.includes(followedUserId)) {
                    throw new Error('You already followed this user!')
                }
                currentUser.follows.push(followedUserId)
                await currentUser.save()
                let followedUser = await User.findByIdAndUpdate(followedUserId, { $push: { followers: currentUserId } })
                let follow = await new Follow({
                    user: currentUserId,
                    follow: followedUser
                }).save()
                return true;
            } catch (error) {
                console.log(error)
                throw new ApolloError("failed")
            }
        },
        unFollowUser: async function (parent, args, context, info) {
            try {
                let currentUserId = context.authUser._id
                let followedUserId = args.userId
                let currentUser = User.findByIdAndUpdate(currentUserId, { $pull: { follows: followedUserId } })
                let followedUser = User.findByIdAndUpdate(followedUserId, { $pull: { followers: currentUserId } })
                await Promise.all([currentUser, followedUser])
                let follow = await Follow.findOneAndDelete({ user: currentUserId, follow: followedUserId })
                return true;
            } catch (err) {
                return false;
            }
        }
    }
}
module.exports = resolver