const { UserInputError, ForbiddenError, AuthenticationError, ApolloError } = require('apollo-server-core');
const Image = require('../../models/Image');
const Post = require('../../models/Post');
const User = require('../../models/User')
const { uploadToCloudinary } = require('../../utils/cloudinary');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')
const resolvers = {
    Query: {
        posts: async function () {
            let result = await Post.find({})
            return result;
        },
        post: async function (parent, args, context, info) {
            let result = await Post.findById(args._id)
            return result
        },
        getFollowedPosts: async function (parent, args, context, info) {
            try {
                let { userId } = args
                let result = await User.findById(userId).populate({
                    path: "follows",
                })
                let followedUsers = []
                result.follows.reduce((followedUsers, follow) => followedUsers.push(follow.follow), followedUsers)
                let posts = await Post.find({ author: { $in: followedUsers } }).sort({ createdAt: 'desc' }).populate("author")
                console.log(posts)
                return { posts, count: posts.length };
            } catch (err) {
                console.log(err)
                throw new ApolloError("Cannot get posts")
            }
        },
        getPostComments: async function (parent, args, context, info) {
            const { postId, limit, offset } = args
            console.log(1)
            let result = await Post.findById(postId)
                .populate("comments")
                .populate({
                    path: "comments",
                    populate: [
                        "author"
                    ]
                })
            console.log(comments)
            return comments;
        },
        searchPosts: async function (parent, args, context, info) {
            const { query, offset, limit } = args
            console.log(query)
            let result = await Post.find()
                .populate("author", { firstName: 1, lastName: 1, avatar: 1, createdAt: 1 }
                )
                .or([{ content: { $regex: new RegExp(query, "i") } },
                ])
                .skip(offset).limit(limit)
            console.log(result)
            return { posts: result, offset, limit, count: result.length }
        }
    },
    Upload: GraphQLUpload,
    Mutation: {
        createNewPost: async function (parent, args, context, info) {
            if (!context.authUser) {
                throw new AuthenticationError('You do not have permission!')
            }
            let { content, userId, image } = args.input
            if (!content) throw new UserInputError("Post's content is required")
            let imageURL, imagePublicId, imageObjectId
            if (image) {
                let { createReadStream } = await image
                const stream = createReadStream()
                const uploadImage = await uploadToCloudinary(stream, 'post')
                if (!uploadImage.secure_url) throw new Error('Image upload failed')
                imageURL = uploadImage.secure_url;
                imagePublicId = uploadImage.public_id;
            }
            const newPost = await new Post({
                content: content,
                author: userId,
                image: imageURL,
                imagePublicId: imagePublicId
            }).save()
            await User.findOneAndUpdate({ _id: userId }, { $push: { posts: newPost._id } })
            return newPost;
        },
        updatePost: async function (parent, args, context, info) {
            let user = content.authUser
            let { content, postId } = args.input
            let post = await Post.findById(postId)
            if (user._id != post.user) {
                throw new ForbiddenError('User does not have pemission to modify this post.')
            }
            if (!content) {
                throw new UserInputError('Must provide update content.')
            }
            post.content = content;
            await post.save()
            return post;
        }
    }
}
module.exports = resolvers