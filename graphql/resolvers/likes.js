const Like = require('../../models/Like')
const Post = require('../../models/Post')
const User = require('../../models/User')
const resolvers = {
    Mutation: {
        createLike: async (parent, args, context, info) => {
            let { postId } = args
            let userId = context.authUser._id;
            const like = await new Like({ user: userId, post: postId }).save()
            //Push like to post collection
            await Post.findOneAndUpdate({ _id: PostId }, { $push: { likes: like._id } })
            return like;
        },
        deleteLike: async (parent, args, context, info) => {
            let { likeId } = args;
            let { userId } = context.authUser
            const like = await Like.findByIdAndDelete(likeId);
            await User.findOneAndUpdate({ _id: userId }, { $pull: { likes: like._id } })
            await Post.findOneAndUpdate({ _id: like.post }, { $pull: { likes: like._id } })
            return like
        }
    }
}

module.exports = resolvers