const {gql} = require('apollo-server-express')

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
        _id: ID!
    }
    #Queries
    extend type Query{
        getUserLikedPosts(_postId:ID):[User]
    }
    #Mutations
    extend type Mutation{
        #New like action from user
        createLike(input: LikeInput):Like
        #Remove like
        deleteLike(input: DeleteLikeInput):Like
    }
`
module.exports = LikeSchema