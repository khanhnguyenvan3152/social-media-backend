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
            await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: like._id }, $inc: { likeCount: 1 } })
            await User.findByIdAndUpdate({ _id: userId }, { $push: { likes: like._id } })
            console.log(like)
            return like;
        },
        deleteLike: async (parent, args, context, info) => {
            let { likeId } = args;
            const like = await Like.findByIdAndDelete(likeId);
            await User.findOneAndUpdate({ _id: like.user }, { $pull: { likes: like._id } })
            await Post.findOneAndUpdate({ _id: like.post }, { $pull: { likes: like._id }, $inc: { likeCount: -1 } })
            return like
        }
    }
}

module.exports = resolvers