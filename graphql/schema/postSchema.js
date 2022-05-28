const { gql } = require('apollo-server-express')
const PostSchema = gql`
    scalar Upload
    type File{
        filename: String!
    mimetype: String!
    encoding: String!
    }
    type Post {
        _id: ID!
        content: String
        images: [File]
        author: User!
        timestamps: Int
        mode: String,
        likes: [User]
        createdAt: Date
        updatedAt: Date
    }
    type PostPayload{
        _id: ID
        image: String
        imagePublicId: String
        comments: [CommentPayload]
        like: [Like]
        author: UserPayload
        likes: [Like]
        createdAt: String
        updatedAt: String
        content: String
    }
    type UserPostsPayload{
        posts: [PostPayload]
        count: String
    }
    type PostsPayload{
        posts: [PostPayload]
        count: Int
    }
    input PostInput{
        content: String
        userId: String
        image: Upload
        imagePublicId: String
        mode: String
    }
    input PostUpdateInput{
        content: String
    }
    input DeletePostInput{
        _id:ID
    }
    type SearchPayload{
        posts:[PostPayload]
        offset: Int
        limit: Int
        count: Int
    }
    extend type Query{
        posts: [Post]!
        post(_id:ID): Post!
        getUserPosts(userId:ID,skip:Int,limit:Int):UserPostsPayload
        getFollowedPosts(userId:ID):PostsPayload
        #Get all posts
        getPosts(authUserId:ID!,skip:Int,limit:Int):PostsPayload
        #Get post by _id
        getPost(_id:Int):PostPayload
        getPostComments(postId:ID,offset:Int,limit:Int):[CommentPayload]
        searchPosts(query:String,offset:Int,limit:Int):SearchPayload
    }
    extend type Mutation{
        createNewPost(input: PostInput):PostPayload
        updatePost(input: PostUpdateInput):PostPayload
        deletePost(input: DeletePostInput):PostPayload
    }
`
module.exports = PostSchema