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
    type PostPayload{
        _id: String
        image: String
        publicImageId: String
        comments: [CommentPayload]
        like: [Like]
        author: UserPayload
        likes: [Like]
        createdAt: String
        updatedAt: String
    }
    type UserPostsPayload{
        posts: [PostPayload]
        count: String
    }
    type PostsPayload{
        posts: [PostsPayload]!
        count: String!
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
    input DeletePostInput{
        _id:ID
    }
    extend type Query{
        posts: [Post]!
        post(_id:ID): Post!
        getUserPosts(_id:ID):UserPostsPayload
        getFollowedPosts(userId:ID,skip:Int,limit:Int):PostsPayload
        #Get all posts
        getPosts(authUserId:ID!,skip:Int,limit:Int):PostsPayload
        #Get post by _id
        getPost(_id:Int):PostPayload
    }
    extend type Mutation{
        createNewPost(input: PostInput):PostPayload
        updatePost(input: PostUpdateInput):PostPayload
        deletePost(input: DeletePostInput):PostPayload
    }
`
module.exports = PostSchema