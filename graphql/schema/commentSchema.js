const { gql } = require('apollo-server-express')

const CommentSchema = gql`
    type Comment{
        _id: ID
        author: User
        post: Post
        content: String
        createdAt: String
    }
    type CommentPayload{
        _id:ID
        author: UserPayload
        post: PostPayload
        content: String
        createdAt:String
    }
    #Inputs
    input CommentInput{
        postId:ID!
        content:String
        authorId:ID!
    }
    input DeleteCommentInput{
        _id: ID
    }
    #Mutations
    extend type Query{
        createComment(input: CommentInput):Comment
        deleteComment(input: DeleteLikeInput):Comment
    }
`
module.exports = CommentSchema