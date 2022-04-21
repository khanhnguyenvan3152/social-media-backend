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
        owner: User!
        timestamps: Int
        mode: String,
        liked: [User]
        createdAt: Date
        updatedAt: Date
    }

    input PostInput{
        content: String
        userId: String
        images: [Upload]
        mode: String
        File: Upload
    }
    input PostUpdateInput{
        content: String
    }
    extend type Query{
        posts: [Post]!
        post(_id:ID): Post!
    }
    extend type Mutation{
        createNewPost(input: PostInput):Post
        singleUpload(file: Upload):File!
        updatePost(input: PostUpdateInput):Post
    }
`
module.exports = PostSchema