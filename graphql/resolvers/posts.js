const Post = require('../../models/Post')

const resolvers= {
    Query:{
        posts:async function(){
            let result = await Post.find({})
            return result;
        },
        post: async function({args,context,info,parent}){
            let result = await Post.findById(args._id)
            return result
        }
    },
    Mutation:{
        create: async function({args,context,info,parent}){
            let {content,userId,images} = args
        }
    }
}