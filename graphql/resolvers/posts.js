const { UserInputError, ForbiddenError, AuthenticationError } = require('apollo-server-core');
const Image = require('../../models/Image');
const Post = require('../../models/Post');
const User = require('../../models/User')
const { uploadToCloudinary } = require('../../utils/cloudinary');
const {GraphQLUpload,graphqlUploadExpress} = require('graphql-upload')
const resolvers = {
    Query: {
        posts: async function () {
            let result = await Post.find({})
            return result;
        },
        post: async function ({ args, context, info, parent }) {
            let result = await Post.findById(args._id)
            return result
        },
       
    },
    Upload: GraphQLUpload,
    Mutation: {
        createNewPost: async function ( parent, args, context, info ) {
            if(!context.authUser){
                throw new AuthenticationError('You do not have permission!')
            }
            let { content, userId, image } = args.input
            if(!content) throw new UserInputError("Post's content is required")
            let imageURL,imagePublicId,imageObjectId
            if(image){
                let {createReadStream}= await image
                const stream = createReadStream()
                const uploadImage = await uploadToCloudinary(stream,'post')
                if(!uploadImage.secure_url) throw new Error('Image upload failed')
                imageURL = uploadImage.secure_url;
                imagePublicId = uploadImage.public_id;
            }
            const newPost = await new Post({
                content: content,
                owner: userId,
                image: imageURL,
                imagePublicId: imagePublicId
            }).save()
            await User.findOneAndUpdate({_id: userId},{$push:{posts: newPost._id}})
            return newPost;
        },
        updatePost: async function({args,context,info,parent}){
            let {content,postId,userId} = args.input
            let post = await Post.findById(postId)
            if(userId != post.user){
                throw new ForbiddenError('User does not have pemission to modify this post.')
            }
            if(!content){
                throw new UserInputError('Must provide update content.')
            }
            post.content = content;
            await post.save()
            return post;
        }
    }
}
module.exports = resolvers