const { gql } = require('apollo-server-express')
const Comment = require('../../models/Comment')
const Post = require('../../models/Post')
const User = require('../../models/User')
const { ApolloError } = require('apollo-server-express')
const resolver = {
    Query: {

    },
    Mutation: {
        createComment: async function (parent, args, context, info) {
            try {
                let { postId, content } = args
                console.log(context.authUser)
                let comment = await new Comment({
                    post: postId,
                    author: context.authUser._id,
                    content: content
                })
                await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } })
                await User.findByIdAndUpdate(context.authUser._id, { $push: { comments: comment._id } })
                return comment
            } catch (err) {
                console.log(err)
                throw new ApolloError("Create new comment failed")
            }
        },
        deleteComment: async function (parent, args, context, info) {
            try {
                let { commentId } = args
                let comment = await Comment.findByIdAndRemove(commentId)
                await Post.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } })
                await User.findByIdAndUpdate(context.authUser._id, { $pull: { comments: commentId } })
                return comment
            } catch (err) {
                throw new ApolloError("Delete comment failed")
            }
        }
    }
}
module.exports = resolver