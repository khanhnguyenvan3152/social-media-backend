const {gql} = require('apollo-server-express')
const {GraphQLUpload,graphqlUploadExpress} = require('graphql-upload')
const PostSchema = gql`
    scalar Upload
    type File{
        filename: String!
    mimetype: String!
    encoding: String!
    }
    type Post {
        _id: ID!
        content: String!
        images: [File]
        user: User!
        timestamps: Int
        mode: String
        createdAt: Date
    }

    input PostInput{
        content: String
        userId: String
        images: [Upload]
        mode: String
        File: Upload
    }
    extend type Query{
        posts: [Post]!
        post(_id:ID): Post!
    }
    extend type Mutation{
        createNewPost(input: PostInput):Post
        singleUpload(file: Upload):File!
    }
`
module.exports = PostSchema