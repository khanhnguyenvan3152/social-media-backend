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
                let follow = await new Follow({
                    user: currentUserId,
                    follow: followedUserId
                }).save()
                let followedUser = await User.findByIdAndUpdate(followedUserId, { $push: { followers: follow._id }, $inc: { followerCount: 1 } })
                await User.findByIdAndUpdate(currentUserId, { $push: { follows: follow._id }, $inc: { followCount: 1 } })
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
                let follow = await Follow.findOne({ user: currentUserId, follow: followedUserId })
                console.log(follow)
                let currentUser = await User.findByIdAndUpdate(currentUserId, { $pull: { follows: follow._id }, $inc: { followCount: -1 } })
                let followedUser = await User.findByIdAndUpdate(followedUserId, { $pull: { followers: follow._id }, $inc: { followerCount: -1 } })
                await Follow.findOneAndDelete(follow._id)
                return true;
            } catch (err) {
                return false;
            }
        }
    }
}
module.exports = resolver