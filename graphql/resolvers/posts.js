const Image = require('../../models/Image');
const Post = require('../../models/Post')
const resolvers = {
    Query: {
        posts: async function () {
            let result = await Post.find({})
            return result;
        },
        post: async function ({ args, context, info, parent }) {
            let result = await Post.findById(args._id)
            return result
        }
    },
    Mutation: {
        createNewPost: async function ({ args, context, info, parent }) {
            let { content, userId, images } = args
            let post = new Post()
            post.content = content
            post.userId = userId
            if (images) {
                let newImages = images.map(async (image) => {
                    let doc = new Image()
                    doc.url = image.url
                    doc.user = userId
                    await doc.save()
                    return doc;
                })
                post.images = newImages
            }
            await post.save()
            return post;
        }
    }
}
module.exports = resolvers