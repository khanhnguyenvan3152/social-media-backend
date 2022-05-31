const { gql } = require('apollo-server-express')

const LikeSchema = gql`
    #Define type
    type Like{
        _id:ID
        post: Post!
        user: User
        createAt: String
    }
    #Payload
    type LikePayload{
        _id:ID
        post: PostPayload
        user: UserPayload
        createAt:String
    }
    #Inputs
    input LikeInput{
        userId: ID!
        postId: ID!
    }
    input DeleteLikeInput{
        likeId:ID
    }
    #Queries
    extend type Query{
        getUserLikedPosts(_postId:ID):[User]
    }
    #Mutations
    extend type Mutation{
        #New like action from user
        createLike(postId:ID):Like
        #Remove like
        deleteLike(postId:ID,likeId:ID):Like
    }
`
module.exports = LikeSchema