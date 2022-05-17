const Follow = require('../../models/Follow')
const User = require('../../models/User')
const resolver = {
    Query: {

    },
    Mutation: {
        followUser: async function (parent, args, context, info) {
            console.log(args)
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
            await follow.populate(
                {
                    path: 'user',
                },
                {
                    path: 'follow'
                }
            )
            console.log(follow)
            return follow;
        },
        unFollowUser: async function (parent, args, context, info) {
            let currentUserId = context.authUser._id
            let followedUserId = args.userId
            let currentUser = await User.findByIdAndUpdate(currentUserId, { $pull: { follows: followedUserId } })
            let follow = await Follow.findOneAndDelete({ user: currentUserId, follow: followedUserId })
            return follow;
        }
    }
}
module.exports = resolver