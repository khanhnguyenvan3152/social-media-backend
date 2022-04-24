const { UserInputError, ForbiddenError } = require('apollo-server-core');
const Image = require('../../models/Image');
const Post = require('../../models/Post');
const { uploadToCloudinary } = require('../../utils/cloudinary');
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
    Mutation: {
        createNewPost: async function ({ args, context, info, parent }) {
            if(!context.user){
                throw new AuthenticationError('You do not have permission!')
            }
            let { content, userId, image } = args.input
            if(!content) throw new UserInputError("Post's content is required")
            let imageURL,imagePublicId,imageObjectId
            if(image){
                let {createReadStream}= await image
                const stream = createReadStream()
                const uploadImage = uploadToCloudinary(stream,'post')
                if(!uploadImage.secure_url) throw new Error('Image upload failed')
                const img = new Image()
                img.url = uploadImage.secure_url;
                img.user = userId
                await img.save()
                imageURL = uploadImage.secure_url;
                imagePublicId = uploadImage.publicId;
                imageObjectId = img._id
            }
            let post = new Post()
            post.content = content
            post.userId = userId
            post.images.push(imageObjectId)
            await post.save()
            return post;
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