const cloudinary = require('cloudinary').v2
const { GraphQLUpload } = require('graphql-upload')
const resolvers= {
    Upload: GraphQLUpload,
    Mutation:{
        singleUpload: async function(parent,{file}){
            const {createReadStream,filename,mimetype,encoding} = await file;
            //Invoking createReadStream will return a readable stream;
            const stream = createReadStream();
            const upload_stream = cloudinary.uploader.upload_stream({timestamp:true,folder:'images'},function(){
                console.log('uploaded')
            })
            stream.pipe(upload_stream)
        }
    }
}

module.exports = resolvers